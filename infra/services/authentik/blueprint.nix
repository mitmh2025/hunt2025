{ config, lib, pkgs, ... }:
let
  cfg = config.services.authentik;
  applyBlueprint = name: {
    model = "authentik_blueprints.metaapplyblueprint";
    attrs.identifiers.name = name;
  };
  keyOf = id: "!KeyOf ${id}";
  find = type: field: value: "!Find [${type}, [${field}, ${value}]]";
  findFlow = find "authentik_flows.flow" "slug";
  findSource = find "authentik_core.source" "slug";
  findScope = find "authentik_providers_oauth2.scopemapping" "managed";
  findProvider = find "authentik_core.provider" "name";
  findPrompt = find "authentik_stages_prompt.prompt" "name";
  findSAMLPropertyMapping = find "authentik_providers_saml.samlpropertymapping" "managed";
in {
  imports = [
    ./blueprint-install.nix
  ];
  config = {
    sops.secrets."authentik/google_oauth/consumer_key" = {};
    sops.secrets."authentik/google_oauth/consumer_secret" = {};
    sops.secrets."authentik/discord_oauth/consumer_key" = {};
    sops.secrets."authentik/discord_oauth/consumer_secret" = {};

    lib.authentik = {
      inherit find findFlow findSource findScope findProvider findPrompt findSAMLPropertyMapping;
    };

    services.authentik.blueprint = {
      version = 1;
      metadata.name = "Hunt 2025";
      entries = [
        (applyBlueprint "Default - Brand")
        (applyBlueprint "Default - Authentication flow")
        (applyBlueprint "Default - Source authentication flow")
        (applyBlueprint "Default - Source enrollment flow")
        (applyBlueprint "Default - Provider authorization flow (implicit consent)")
        # Brand
        {
          model = "authentik_brands.brand";
          identifiers.domain = "authentik-default";
          attrs.branding_title = "Hunt 2025";
          attrs.web_certificate = find "authentik_crypto.certificatekeypair" "name" "auth.mitmh2025.com";
        }
        # Login flows
        {
          model = "authentik_flows.flow";
          identifiers.slug = "default-authentication-flow";
          attrs.designation = "authentication";
          attrs.name = "Hunt 2025";
          attrs.title = "Hunt 2025";
          attrs.authentication = "none";
        }
        {
          model = "authentik_stages_user_login.userloginstage";
          identifiers.name = "default-authentication-login";
          attrs.remember_me_offset = "days=90";
          attrs.session_duration = "seconds=0";
        }
        {
          model = "authentik_stages_user_login.userloginstage";
          identifiers.name = "default-source-authentication-login";
          attrs.remember_me_offset = "days=90";
          attrs.session_duration = "seconds=0";
        }
        # Enrollment flows
        {
          model = "authentik_flows.flow";
          identifiers.slug = "enrollment-invitation";
          id = "enrollment-invitation-flow";
          attrs.name = "enrollment-invitation";
          attrs.title = "Invitation";
          attrs.designation = "enrollment";
          attrs.authentication = "require_unauthenticated";
        }
        {
          model = "authentik_stages_invitation.invitationstage";
          identifiers.name = "enrollment-invitation";
          id = "enrollment-invitation-stage-1";
          attrs.continue_flow_without_invitation = false;
        }
        {
          model = "authentik_stages_prompt.prompt";
          identifiers.name = "enrollment-invitation-field-username";
          attrs.field_key = "username";
          attrs.label = "Username";
          attrs.required = true;
          attrs.type = "text";
          attrs.placeholder = "Username";
          attrs.order = 100;
        }
        {
          model = "authentik_stages_prompt.prompt";
          identifiers.name = "enrollment-invitation-field-password";
          attrs.field_key = "password";
          attrs.label = "Password";
          attrs.required = true;
          attrs.type = "password";
          attrs.placeholder = "Password";
          attrs.order = 150;
        }
        {
          model = "authentik_stages_prompt.prompt";
          identifiers.name = "enrollment-invitation-field-password-repeat";
          attrs.field_key = "password-repeat";
          attrs.label = "Password (repeat)";
          attrs.required = true;
          attrs.type = "password";
          attrs.placeholder = "Password (repeat)";
          attrs.order = 160;
        }
        {
          model = "authentik_stages_prompt.prompt";
          identifiers.name = "enrollment-invitation-field-name";
          attrs.field_key = "name";
          attrs.label = "Name";
          attrs.required = true;
          attrs.type = "text";
          attrs.placeholder = "Name";
          attrs.order = 200;
        }
        {
          model = "authentik_stages_prompt.prompt";
          identifiers.name = "enrollment-invitation-field-email";
          attrs.field_key = "email";
          attrs.label = "Email";
          attrs.required = true;
          attrs.type = "text";
          attrs.placeholder = "Email";
          attrs.order = 250;
        }
        {
          model = "authentik_stages_prompt.promptstage";
          identifiers.name = "enrollment-invitation-prompt";
          id = "enrollment-invitation-stage-2";
          attrs.fields = map findPrompt [
            "enrollment-invitation-field-username"
            "enrollment-invitation-field-password"
            "enrollment-invitation-field-password-repeat"
            "enrollment-invitation-field-name"
            "enrollment-invitation-field-email"
          ];
        }
        {
          model = "authentik_stages_user_write.userwritestage";
          identifiers.name = "enrollment-invitation-write";
          id = "enrollment-invitation-stage-3";
          attrs.user_creation_mode = "always_create";
        }
        {
          model = "authentik_flows.flowstagebinding";
          identifiers = {
            target = keyOf "enrollment-invitation-flow";
            stage = keyOf "enrollment-invitation-stage-1";
            order = 10;
          };
        }
        {
          model = "authentik_flows.flowstagebinding";
          identifiers = {
            target = keyOf "enrollment-invitation-flow";
            stage = keyOf "enrollment-invitation-stage-2";
            order = 20;
          };
        }
        {
          model = "authentik_flows.flowstagebinding";
          identifiers = {
            target = keyOf "enrollment-invitation-flow";
            stage = keyOf "enrollment-invitation-stage-3";
            order = 30;
          };
        }
        # Require invitation for source enrollment
        {
          model = "authentik_policies_expression.expressionpolicy";
          identifiers.name = "source-enrollment-if-invitation";
          id = "source-enrollment-if-invitation-policy";
          attrs.expression = ''
            from authentik.stages.invitation.models import Invitation
            provider_type = context["source"].provider_type
            if provider_type == "google":
              google_username = context.get("oauth_userinfo", {}).get("email")
              try:
                return google_username and Invitation.objects.get(fixed_data__email=google_username)
              except:
                pass
            elif provider_type == "discord":
              # Let users pick their own username
              context["prompt_data"].pop("username", None)
              discord_username = context.get("oauth_userinfo", {}).get("username")
              try:
                return discord_username and Invitation.objects.get(fixed_data__discord_username=discord_username)
              except:
                pass
            return False
          '';
        }
        # Require an invitation for source enrollment
        {
          model = "authentik_flows.flow";
          identifiers.slug = "default-source-enrollment";
          id = "default-source-enrollment-flow";
          attrs.policy_engine_mode = "all";
        }
        {
          model = "authentik_policies.policybinding";
          identifiers.order = 1;
          attrs.policy = keyOf "source-enrollment-if-invitation-policy";
          attrs.target = keyOf "default-source-enrollment-flow";
        }
        # OAuth2 sources
        {
          model = "authentik_sources_oauth.oauthsource";
          name = "Google";
          identifiers.slug = "google";
          attrs = {
            access_token_url = "https://oauth2.googleapis.com/token";
            authentication_flow = findFlow "default-source-authentication";
            authorization_url = "https://accounts.google.com/o/oauth2/v2/auth";
            consumer_key = config.sops.placeholder."authentik/google_oauth/consumer_key";
            consumer_secret = config.sops.placeholder."authentik/google_oauth/consumer_secret";
            enabled = true;
            enrollment_flow = findFlow "default-source-enrollment";
            name = "Google";
            oidc_jwks_url = "https://www.googleapis.com/oauth2/v3/certs";
            policy_engine_mode = "any";
            profile_url = "https://openidconnect.googleapis.com/v1/userinfo";
            provider_type = "google";
            user_matching_mode = "identifier";
            user_path_template = "goauthentik.io/sources/%(slug)s";
          };
        }
        {
          model = "authentik_sources_oauth.oauthsource";
          name = "Discord";
          identifiers.slug = "discord";
          attrs = {
            access_token_url = "https://discord.com/api/oauth2/token";
            authentication_flow = findFlow "default-source-authentication";
            authorization_url = "https://discord.com/api/oauth2/authorize";
            consumer_key = config.sops.placeholder."authentik/discord_oauth/consumer_key";
            consumer_secret = config.sops.placeholder."authentik/discord_oauth/consumer_secret";
            enabled = true;
            enrollment_flow = findFlow "default-source-enrollment";
            name = "Discord";
            policy_engine_mode = "any";
            profile_url = "https://discord.com/api/users/@me";
            provider_type = "discord";
            user_matching_mode = "identifier";
            user_path_template = "goauthentik.io/sources/%(slug)s";
          };
        }
        {
          model = "authentik_stages_identification.identificationstage";
          identifiers.name = "default-authentication-identification";
          attrs.user_fields = [
            "email"
            "username"
          ];
          attrs.sources = [
            (findSource "authentik-built-in")
            (findSource "google")
            (findSource "discord")
          ];
        }
        # Applications
      ]
      ++ lib.mapAttrsToList (managed: attrs: {
        model = "authentik_providers_saml.samlpropertymapping";
        identifiers.managed = managed;
        inherit attrs;
      }) cfg.samlPropertyMappings
      ++ lib.concatMap (app: app.blueprint) (lib.attrValues cfg.apps)
      ++ [
        {
          model = "authentik_outposts.outpost";
          identifiers.managed = "goauthentik.io/outposts/embedded";
          attrs.providers = builtins.map (p: findProvider p.name) (builtins.filter (p: p.type == "proxy") (lib.attrValues cfg.apps));
        }
      ];
    };
  };
}
