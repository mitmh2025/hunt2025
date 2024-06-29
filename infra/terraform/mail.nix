{ lib, ... }:
{
  resource.aws_route53_record.mx = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = "";
    type = "MX";
    ttl = "300";
    records = [
      "10 mx1.improvmx.com."
      "20 mx2.improvmx.com."
    ];
  };
  resource.aws_route53_record.spf = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = "";
    type = "TXT";
    ttl = "300";
    records = [
      "google-site-verification=b_s6ygjD54UbEieUrqnoYtfVIsvl3IzQiVz4Az_9KLY"
      "v=spf1 include:spf.improvmx.com ~all"
    ];
  };
  resource.aws_route53_record.postmark_dkim = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = "20240629065159pm._domainkey";
    type = "TXT";
    ttl = "300";
    records = [
      "k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSpgCruJvz3C9Uv7p0xTZeUzsf5iyeOcEogg4D4W54plbZiGsj9dbyugbho93ERO+WksjI2Q/sOexb+M/9d7F27tIWFQFiah8JVicrYldMZqLGSm5ZDTHkj/st2NkJuEClh8PDF2o9aXjT9Sv6NDqfYen6Af/LkW7a9tjpu0nMZwIDAQAB"
    ];
  };
  resource.aws_route53_record.postmark_returnpath = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = "pm-bounces";
    type = "CNAME";
    ttl = "300";
    records = [
      "pm.mtasv.net"
    ];
  };
}
