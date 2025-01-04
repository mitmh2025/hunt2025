{ config, pkgs, lib, ... }:
let
  cfg = config.hunt2025.tix;
in {
  options = with lib; {
    hunt2025.tix = {
      fqdn = mkOption {
        type = types.str;
        default = "tix.${cfg.domain}";
      };
      domain = mkOption {
        type = types.str;
      };
      authentikApp = mkOption {
        type = types.str;
      };
    };
  };
  config = {
    sops.secrets."zammad/secret_key_base" = {
      owner = config.systemd.services.zammad-web.serviceConfig.User;
    };
    sops.secrets."zammad/smtp/user" = {};
    sops.secrets."zammad/smtp/password" = {};
    services.zammad = {
      enable = true;
      redis.port = 6389;  # Deconflict with Authentik
      secretKeyBaseFile = config.sops.secrets."zammad/secret_key_base".path;

      settings = {
        product_name = "Hunt 2025";
        organization = "Hunt 2025";
        timezone_default = "America/New_York";
        inherit (cfg) fqdn;
        http_type = "https";
        customer_ticket_create = false;
        auth_saml = true;
        auth_saml_credentials = {
          display_name = "Hunt 2025";
          idp_sso_target_url = "https://auth.mitmh2025.com/application/saml/${cfg.authentikApp}/sso/binding/redirect/";
          idp_slo_service_url = "https://auth.mitmh2025.com/application/saml/${cfg.authentikApp}/slo/binding/redirect/";
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

        ticket_agent_default_notifications = let
          channel = {
            email = false;
            online = true;
          };
          mineAndSub = {
            criteria = {
              owned_by_me = true;
              owned_by_nobody = false;
              subscribed = true;
              no = false;
            };
            inherit channel;
          };
          mine = {
            criteria = {
              owned_by_me = true;
              owned_by_nobody = false;
              subscribed = false;
              no = false;
            };
            inherit channel;
          };
        in {
          create = mineAndSub;
          update = mineAndSub;
          reminder_reached = mine;
          escalation = mine;
        };
      };

      channels = let
        outbound = {
          adapter = "smtp";
          options = {
            host = "smtp.postmarkapp.com";
            port = 587;
            user = config.sops.placeholder."zammad/smtp/user";
            password = config.sops.placeholder."zammad/smtp/password";
            inherit (cfg) domain;
            enable_starttls_auto = true;
            ssl_verify = true;
          };
        };
      in [
        {
          id = 3;
          area = "Email::Notification";
          options.outbound = outbound;
          preferences.online_service_disable = true;
        }
        {
          id = 2;
          area = "Email::Account";
          options.inbound = { adapter = "null"; options = {}; };
          options.outbound = outbound;
          active = true;
        }
      ];

      addresses = [
        {
          id = 1;
          channel_id = 2;
          name = "Hunt 2025";
          email = "help@${cfg.domain}";
        }
        {
          id = 2;
          channel_id = 2;
          name = "Hints";
          email = "hints@${cfg.domain}";
        }
      ];
    };
    services.nginx = {
      upstreams.zammad.servers."127.0.0.1:${toString config.services.zammad.port}" = {};
      upstreams.zammad-websocket.servers."127.0.0.1:${toString config.services.zammad.websocketPort}" = {};
      virtualHosts = {
        "${cfg.fqdn}" = {
          forceSSL = true;
          enableACME = true;
          locations."/" = {
            proxyPass = "http://zammad";
            proxyWebsockets = true;
          };
          locations."/ws" = {
            proxyPass = "http://zammad-websocket";
            proxyWebsockets = true;
          };
        };
      };
    };
    systemd.services.postfix.serviceConfig = {
      MemoryDenyWriteExecute = lib.mkForce false;
    };
    services.postfix = {
      enable = true;
      inherit (cfg) domain;
      mapFiles.mailbox_commands = let
        deliverZammad = pkgs.writeShellApplication {
          name = "deliver-zammad";

          runtimeInputs = with pkgs; [
            git
            nodejs
          ];
          text = ''
            cd ${config.services.zammad.dataDir} && exec ./script/rails r -e production 'Channel::Driver::MailStdin.new(trusted: true)'
          '';
        };
      in pkgs.writeText "postfix-mailbox_commands" ''
        zammad ${deliverZammad}/bin/deliver-zammad
      '';
      config = {
        myorigin = "$mydomain";
        mailbox_command_maps = ["hash:/etc/postfix/mailbox_commands"];
      };
      extraAliases = ''
        help: zammad
        hints: zammad
      '';
    };
  };
}