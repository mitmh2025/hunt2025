{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers.local = {
    source = "registry.terraform.io/hashicorp/local";
  };
  resource.local_file.test_import = {
    filename = "test_import.txt";
    content = "A terranix created test file using imports. YEY!";
  };
}
