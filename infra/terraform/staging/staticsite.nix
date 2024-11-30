{ lib, ... }:
{
  # S3 Bucket
  resource.aws_s3_bucket.publicsite = {
    bucket_prefix = "mitmh2025-site";
  };

  resource.aws_s3_bucket_ownership_controls.publicsite = {
    bucket = lib.tfRef "aws_s3_bucket.publicsite.id";
    rule.object_ownership = "BucketOwnerEnforced";
  };

  resource.aws_s3_bucket_policy.publicsite = {
    bucket = lib.tfRef "aws_s3_bucket.publicsite.id";
    policy = lib.tfRef "data.aws_iam_policy_document.publicsite.json";
  };

  data.aws_iam_policy_document.publicsite.statement = {
    principals.type = "Service";
    principals.identifiers = ["cloudfront.amazonaws.com"];
    actions = [
      "s3:GetObject"
      "s3:ListBucket" # TODO: Required?
    ];
    resources = [
      (lib.tfRef "aws_s3_bucket.publicsite.arn")
      "${lib.tfRef "aws_s3_bucket.publicsite.arn"}/*"
    ];
    condition.test = "StringEquals";
    condition.variable = "AWS:SourceArn";
    condition.values = [(lib.tfRef "aws_cloudfront_distribution.publicsite.arn")];
  };

  # File upload

  module.publicsite_files = {
    source = "hashicorp/dir/template";
    base_dir = "${./../../../regsite}";
  };

  resource.aws_s3_object.publicsite_files = {
    for_each = lib.tfRef "module.publicsite_files.files";

    bucket = lib.tfRef "aws_s3_bucket.publicsite.id";

    # https://registry.terraform.io/modules/hashicorp/dir/template/latest#uploading-files-to-amazon-s3
    key = lib.tfRef "each.key";
    content_type = lib.tfRef "each.value.content_type";
    source = lib.tfRef "each.value.source_path";
    etag = lib.tfRef "each.value.digests.md5";
  };

  # CloudFront Distribution

  resource.aws_cloudfront_origin_access_control.publicsite = {
    name = "publicsite";
    description = "Public Site Policy";
    origin_access_control_origin_type = "s3";
    signing_behavior = "always";
    signing_protocol = "sigv4";
  };

  resource.aws_cloudfront_cache_policy.publicsite = {
    name = "publicsite";

    min_ttl = 0;
    default_ttl = 60;
    max_ttl = 3600;
    parameters_in_cache_key_and_forwarded_to_origin = {
      cookies_config.cookie_behavior = "none";
      headers_config.header_behavior = "none";
      query_strings_config.query_string_behavior = "none";
    };
  };

  resource.aws_cloudfront_distribution.publicsite = let
    origin_id = lib.tfRef "aws_s3_bucket.publicsite.id";
  in {
    origin = {
      domain_name = lib.tfRef "aws_s3_bucket.publicsite.bucket_regional_domain_name";
      origin_access_control_id = lib.tfRef "aws_cloudfront_origin_access_control.publicsite.id";
      inherit origin_id;
    };

    enabled = true;
    is_ipv6_enabled = true;
    default_root_object = "index.html";

    aliases = ["www.mitmh2025.com"];

    default_cache_behavior = {
      allowed_methods  = ["GET" "HEAD" "OPTIONS"];
      cached_methods   = ["GET" "HEAD"];
      target_origin_id = origin_id;

      cache_policy_id = lib.tfRef "aws_cloudfront_cache_policy.publicsite.id";
      viewer_protocol_policy = "redirect-to-https";
    };

    price_class = "PriceClass_200";

    restrictions.geo_restriction.restriction_type = "none";

    tags.Environment = "production";

    viewer_certificate.acm_certificate_arn = lib.tfRef "aws_acm_certificate_validation.www.certificate_arn";
    viewer_certificate.ssl_support_method = "sni-only";
  };

  # root -> www redirect

  resource.aws_cloudfront_distribution.publicsite-apex = let
    origin_id = lib.tfRef "aws_s3_bucket.publicsite.id";
  in {
    # Even though the origin is unused, AWS still requires an origin.
    origin = {
      domain_name = lib.tfRef "aws_s3_bucket.publicsite.bucket_regional_domain_name";
      origin_access_control_id = lib.tfRef "aws_cloudfront_origin_access_control.publicsite.id";
      inherit origin_id;
    };
    enabled = true;
    is_ipv6_enabled = true;

    aliases = ["mitmh2025.com"];

    default_cache_behavior = {
      allowed_methods  = ["GET" "HEAD" "OPTIONS"];
      cached_methods   = ["GET" "HEAD"];
      target_origin_id = origin_id;

      cache_policy_id = lib.tfRef "aws_cloudfront_cache_policy.publicsite.id";
      function_association = {
        event_type = "viewer-request";
        function_arn = lib.tfRef "aws_cloudfront_function.redirect-apex.arn";
      };
      viewer_protocol_policy = "allow-all";
    };

    price_class = "PriceClass_200";

    restrictions.geo_restriction.restriction_type = "none";

    tags.Environment = "production";

    viewer_certificate.acm_certificate_arn = lib.tfRef "aws_acm_certificate_validation.www.certificate_arn";
    viewer_certificate.ssl_support_method = "sni-only";
  };

  resource.aws_cloudfront_function.redirect-apex = {
    name = "redirect-apex";
    runtime = "cloudfront-js-2.0";
    code = ''
      function handler(event) {
        var response = {
          statusCode: 302,
          statusDescription: 'Found',
          headers: {
            'location': { value: 'https://www.mitmh2025.com' + event.request.uri }
          }
        };
        return response;
      }
    '';
  };

  # SSL

  resource.aws_acm_certificate.www = let
    # N.B. We can't use `aws_route53_record.mitmh2025_www.fqdn` here because the route53 record depends on cloudfront depends on this certificate.
    domain = lib.tfRef "data.aws_route53_zone.mitmh2025.name";
  in {
    domain_name = "www.${domain}";
    subject_alternative_names = [domain];
    validation_method = "DNS";
    lifecycle.create_before_destroy = true;
  };

  route53.mitmh2025.rr.www_acm_validation = {
    for_each = lib.tfRef "{for dvo in aws_acm_certificate.www.domain_validation_options : dvo.domain_name => dvo}";

    allow_overwrite = true;
    name = lib.tfRef "each.value.resource_record_name";
    records = [(lib.tfRef "each.value.resource_record_value")];
    ttl = 60;
    type = lib.tfRef "each.value.resource_record_type";
  };

  resource.aws_acm_certificate_validation.www = {
    certificate_arn = lib.tfRef "aws_acm_certificate.www.arn";
    validation_record_fqdns = lib.tfRef ''[for record in aws_route53_record.mitmh2025_www_acm_validation : record.fqdn]'';
  };
}
