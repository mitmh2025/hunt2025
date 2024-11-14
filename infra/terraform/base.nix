{
  gce.project.metadata = {
    # Use zonal DNS names
    # https://cloud.google.com/compute/docs/networking/zonal-dns
    VmDnsSetting = "ZonalOnly";
    # Allow guest attributes
    # https://cloud.google.com/compute/docs/metadata/manage-guest-attributes
    # https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys#instance-guest-attributes-metadata
    enable-guest-attributes = "TRUE";
  };
}

