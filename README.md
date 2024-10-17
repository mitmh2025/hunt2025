# Mystery Hunt 2025 Infrastructure

This repo should contain all binaries/configuration/deployment tooling for MH 2025. Currently it contains:

* Terraform configuration in `infra/terraform/`
  * `nix run ".#staging.apply"` run `terraform apply`
  * `nix run ".#staging.destroy"` run `terraform destroy`
* Nix packages to build and run various bits of software
  * `nix run .#hunt2025 -L` to build and run the production site
  * `nix build .#hunt2025-vm-test -L` to run Playwright tests in an isolated VM with the production build of the site (leaving Playwright reports in `./result`)
  * `nix run` to build and launch a development VM with Postgres, Redis, Nginx, frontend, etc.
  * `nix run .#dev-vm-base` to build and launch a development VM with Postgres and Redis (for use with a local frontend)
