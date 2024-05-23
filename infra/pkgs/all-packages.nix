final: prev: {
  hunt2025 = final.callPackage ../../site {};
  thingsboard = final.callPackage ./thingsboard.nix {};

  hunt2025-vm-test = final.callPackage ../test.nix {};
}
