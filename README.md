# Mystery Hunt 2025 Infrastructure

This repo should contain all binaries/configuration/deployment tooling for MH 2025. Currently it contains:

* Terraform configuration in `infra/config.nix`
  * `nix run ".#apply"` run `terraform apply`
  * `nix run ".#destroy"` run `terraform destroy`
* Build script for a self-contained single host in `infra/server.nix`
  * `nix run` to build and launch a development VM with Postgres, Redis, Nginx, frontend, etc.
