# syntax=docker/dockerfile:1.3-labs

FROM --platform=linux/amd64 docker.nix-community.org/nixpkgs/devcontainer

COPY <<EOF /etc/nix/nix.conf
experimental-features = nix-command flakes
filter-syscalls = false
system-features = kvm
extra-substituters = s3://rb8tcjeo-nix-cache?endpoint=https://storage.googleapis.com&profile=gcp-mitmh2025-staging
require-sigs = false
EOF
