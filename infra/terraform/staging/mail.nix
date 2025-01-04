{ lib, ... }:
{
  route53.mitmh2025.rr = {
    postmark_dkim = {
      name = "20250104065003pm._domainkey.staging";
      type = "TXT";
      ttl = "300";
      records = [
        "k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnmj1DSxJ81CG3yA2uQBg6AkwoXff3R1thXGkaNW42GH9CVK+1I6Zdfr4gGLnHT6MW14NSFD5dKNlX+/R5fXsMQw0ap3REoWsHBwWVo8HVuDBtL+ErbasbcjDV8fI+VdqS0RfQXpLW5fJ1RCM5hZZBKqjM87KbvKAArugIrlyNAwIDAQAB"
      ];
    };
    postmark_returnpath = {
      name = "pm-bounces.staging";
      type = "CNAME";
      ttl = "300";
      records = [
        "pm.mtasv.net"
      ];
    };
  };
}