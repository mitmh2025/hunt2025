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
  resource.aws_ses_domain_identity.mitmh2025 = {
    domain = "mitmh2025.com";
  };
  resource.aws_route53_record.mitmh2025_ses_verification = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = "_amazonses.mitmh2025.com";
    type = "TXT";
    ttl = "300";
    records = [
      (lib.tfRef "aws_ses_domain_identity.mitmh2025.verification_token")
    ];
  };
  resource.aws_ses_domain_mail_from.mitmh2025 = {
    domain = lib.tfRef "aws_ses_domain_identity.mitmh2025.domain";
    mail_from_domain = "mail.mitmh2025.com";
  };
  resource.aws_route53_record.mitmh2025_ses_mail_from_txt = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = lib.tfRef "resource.aws_ses_domain_mail_from.mitmh2025.mail_from_domain";
    type = "TXT";
    ttl = "300";
    records = ["v=spf1 include:amazonses.com ~all"];
  };
  resource.aws_route53_record.mitmh2025_ses_mail_from_mx = {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = lib.tfRef "resource.aws_ses_domain_mail_from.mitmh2025.mail_from_domain";
    type = "MX";
    ttl = "300";
    records = ["10 feedback-smtp.us-east-1.amazonses.com"];
  };
  resource.aws_ses_domain_dkim.mitmh2025 = {
    domain = lib.tfRef "aws_ses_domain_identity.mitmh2025.domain";
  };
  resource.aws_route53_record.mitmh2025_ses_dkim = {
    count = 3;
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    name = lib.concatStrings [(lib.tfRef "aws_ses_domain_dkim.mitmh2025.dkim_tokens[count.index]") "._domainkey"];
    type = "CNAME";
    ttl = "1800";
    records = [(lib.concatStrings [(lib.tfRef "aws_ses_domain_dkim.mitmh2025.dkim_tokens[count.index]") ".dkim.amazonses.com"])];
  };
}
