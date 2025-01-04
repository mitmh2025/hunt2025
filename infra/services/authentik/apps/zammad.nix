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
        "goauthentik.io/providers/saml/groups"
      ];
      provider.attrs.acs_url = "https://tix.mitmh2025.com/auth/saml/callback";
      provider.attrs.name_id_mapping = config.lib.authentik.findSAMLPropertyMapping "auth.mitmh2025.com/zammad/NameID";
      groups = ["authentik Admins"];
    };
    apps.staging-tix = {
      name = "Staging Tickets";
      app.attrs.group = "Staging";
      type = "saml";
      properties = [
        "auth.mitmh2025.com/zammad/email"
        "auth.mitmh2025.com/zammad/name"
        "auth.mitmh2025.com/zammad/nickname"
        "auth.mitmh2025.com/zammad/display_name"
        "goauthentik.io/providers/saml/groups"
      ];
      provider.attrs.acs_url = "https://tix.staging.mitmh2025.com/auth/saml/callback";
      provider.attrs.name_id_mapping = config.lib.authentik.findSAMLPropertyMapping "auth.mitmh2025.com/zammad/NameID";
      groups = ["authentik Admins"];
    };
  };
}
