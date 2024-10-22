{ config, lib, ... }:
{
  services.authentik = {
    samlPropertyMappings = lib.mapAttrs' (name: value: lib.nameValuePair "auth.mitmh2025.com/zammad/${name}" {
      name = "Zammad ${name}";
      saml_name = name;
      expression = value;
    }) rec {
      email = "return request.user.email";
      name = "return request.user.name";
      nickname = "return request.user.username";
      display_name = name;
      NameID = ''
        return request.user.username + "@auth.mitmh2025.com"
      '';
    };
    apps.tix = {
      name = "Tickets";
      type = "saml";
      properties = [
        "auth.mitmh2025.com/zammad/email"
        "auth.mitmh2025.com/zammad/name"
        "auth.mitmh2025.com/zammad/nickname"
        "auth.mitmh2025.com/zammad/display_name"
      ];
      provider.acs_url = "https://tix.mitmh2025.com/auth/saml/callback";
      provider.name_id_mapping = config.lib.authentik.findSAMLPropertyMapping "auth.mitmh2025.com/zammad/NameID";
      groups = ["authentik Admins"];
    };
  };
  services.zammad.settings = {
    auth_saml = true;
    auth_saml_credentials = {
      display_name = "Hunt 2025";
      idp_sso_target_url = "https://auth.mitmh2025.com/application/saml/tix/sso/binding/redirect/";
      idp_slo_service_url = "https://auth.mitmh2025.com/application/saml/tix/slo/binding/redirect/";
      # The PEM-encoded body of the generated "authentik Self-signed Certificate"
      idp_cert = ''
        MIIFUzCCAzugAwIBAgIRAMar6GW94EY8uCrkfs8tKRAwDQYJKoZIhvcNAQELBQAw
        HTEbMBkGA1UEAwwSYXV0aGVudGlrIDIwMjQuNC4yMB4XDTI0MDYxODEzMTU0NFoX
        DTI1MDYxOTEzMTU0NFowVjEqMCgGA1UEAwwhYXV0aGVudGlrIFNlbGYtc2lnbmVk
        IENlcnRpZmljYXRlMRIwEAYDVQQKDAlhdXRoZW50aWsxFDASBgNVBAsMC1NlbGYt
        c2lnbmVkMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA5InrB/rdHsnv
        MhEOmKo3si/nVCdw23gR3B018Wl1BytxYXm29ZsaV0nX+GoxTDy+pvZWz7FIaZ8v
        e3NsQSu114ScERsDMaE9srEfKi5e4m/jxzHzcPtUg5n+UUz/s4V94fOWqYJtsM77
        /bG6V4V3kXBOpDticC5AUZASTy8nNkTWceseI8BX34Oa79TUlRM1QkXBYsHTs5lz
        naqmTmX9x8XPyXnl1438I9MgfxBz66UAMsD8MrDF4eKpdB6jc6v0PJWZ/7OP1cHv
        Rg9/xf/g0NW5akHTvEd/OTHIV+4HG58t5k+nPLawgMfiY/mk/OExqxPro/UlgFc0
        QlqKVdcVV9LMqp+998aD0x7wG6lPaV2pqrvCmkf49vwvO+LZYvNiTFwPnVzJjffP
        ie2Ys0AhCBclswFD8OVszZm0UONcbewpbwcaoLsWBzH+bZlvCM3VpGOTRTxU6HqN
        3tsPePYp6d+XiMYfR4Qh77Fy92fEnJhteAwWr5DbtJDjS2zj6hjLuUFop2JYdnxX
        w4XmJyq1ZopOL+f7yzZ3W/X7im+QAiMH/g1NPRYtrno/SfJEs8aTGuwKddUgCCk1
        EaQ5P++M2PztApqtXsDdk46naEwiBNfVxlzFK5OJ2JdiJ9TYnk10VXXzNF2hrxYC
        m492onJ+RG/+N3RrZwMDghJqOS0LJ4sCAwEAAaNVMFMwUQYDVR0RAQH/BEcwRYJD
        bmtGMkFWZVFmWk1DTzRYRHNLMjZHRURKRllyUE1Ra2tPUUpVSFcwSi5zZWxmLXNp
        Z25lZC5nb2F1dGhlbnRpay5pbzANBgkqhkiG9w0BAQsFAAOCAgEAD6JYAtfn7Wbk
        wJW6LMIXFwhu4yd9N19uAc+Fhov5taoEwezENrgyS45/9kQ2fetzBKBsMQo5/7al
        3UxLwrjSkTwLaf3snHnbjb7ui2DAcBsoNk0l3qr/Fzjg2OBpS0z8Jrv7fNo51mIO
        4WTJX8T7crY/9XM36XSVwiz6pmqGaBki+MXrIsf+UN9OuDn2LUYzF91aCMxZbbS2
        7THsBzfLNeLCTGLb9w0OX74gAAs0yxJUDsCstAOLNRZWQd73wXi2cu8Fbn0TPcVD
        DXAJ2Bwfn1m1oU9CjoRoVS+AODNymbjiZiRYCZj5Ga5diVgT6Adxmezc+kP0FGT6
        OtS2C2SQWeEhXlTiXKnTx4XWdhTirqikiWwnF8pdQPMl9/mL8PhQ3NfCK+PicT5j
        uRzZMkWlCV46bsZ+ana/RwFVoP6p3KfGAdxxJzcditxgpu67U9ioedjZIsHTgrZd
        lRFzg4YN/yqNIgUKD5hihO6qwphgA3MOZXDAsF7R4iHB6EwoaSUA2ld2MzmBS9dJ
        LpzmcNz8hQangLJT021+HMZnGeFHx/kzrm0/hwqvBeaXbmRDLM3QyXQ4F6GI2/e7
        DAPSgxJWTFJ6RlLiHNAlr/OSf78IGgkoseQW8Ts3ZIy4okG0ZR1UQHB/euoNqP56
        v3xtI+h7DYaXQVvlDPj1Qpa0hrY8NmY=
      '';
      name_identifier_format = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress";
      ssl_verify = false; # TODO: SSL verification is broken https://github.com/zammad/zammad/issues/5106
      # idp_cert_fingerprint = "";
      # uid_attribute = "";
      # security = "off";
      # certificate = "";
      # private_key = "";
      # private_key_secret = "";
    };
    user_show_password_login = false;
  };
}
