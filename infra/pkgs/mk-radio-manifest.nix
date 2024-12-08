{ runCommand
, tree
, jq
, coreutils
}:
{ name ? "manifest"
, baseUrl ? ""
, src
}: runCommand name {
  nativeBuildInputs = [
    tree
    jq
    coreutils
  ];
  inherit src baseUrl;
  jqScript = ''
    def flattenTree:
      (.[] | select(.type == "file")),
      (.[]
        | select (.type == "directory")
        | .name as $parent
        | .contents
        | flattenTree
        | .name |= "\($parent)/\(.)"
      );
    . as $tree
    | $sums
    | split("\n")
    | [.[]
      | select(. != "")
      | split("  ")
      | {"key": .[1], "value": .[0]}
    ]
    | from_entries as $sums
    | $tree | .[] | select(.type == "directory") | .contents | [flattenTree]
    | map(
      .hash = $sums["./\(.name)"]
      | . += (.name | capture("\\.(?<ext>[^.]+)$"))
      | .path = "\(.hash).\(.ext)"
      | .url = "\(env.baseUrl)/\(.path)"
    )
    | {files: .}
  '';
} ''
  mkdir $out
  tree -Js "$src" | jq --rawfile sums <(cd "$src" && md5sum $(find -type f)) "$jqScript" > $out/manifest.json
  <$out/manifest.json jq -r '.files[] | "cp $src/\(.name) $out/\(.path)"' | sh -xe
  mv $out/manifest.json $out/$(md5sum $out/manifest.json | awk '{ print $1 }').json
''