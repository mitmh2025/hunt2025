{ curl
, jq
, awscli2
, writeShellApplication
}:
writeShellApplication {
  name = "aws-credential-process";
  runtimeInputs = [
    curl
    jq
    awscli2
  ];
  text = ''
    AUDIENCE="aws"
    ACCOUNT_ID=$1
    ROLE_NAME=$2
    ROLE_ARN="arn:aws:iam::''${ACCOUNT_ID}:role/''${ROLE_NAME}"

    jwt_token=$(curl -sH "Metadata-Flavor: Google" "http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=''${AUDIENCE}&format=full&licenses=FALSE")

    jwt_sub=$(jq -R -r 'split(".") | .[1] | @base64d | fromjson | .sub' <<< "$jwt_token")

    (unset AWS_PROFILE; aws sts assume-role-with-web-identity --role-arn "$ROLE_ARN" --role-session-name "$jwt_sub" --web-identity-token "$jwt_token" | jq '.Credentials | .Version=1')
  '';
}
