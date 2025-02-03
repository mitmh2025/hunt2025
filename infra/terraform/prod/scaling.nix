{
  gce.instance.deploy = {
    machineType = "e2-standard-8"; # 8 vCPU, 32 GB RAM
    # SSD persistent disks have a limit of 30 IOPS and 0.48 MiB/s per GiB of capacity.
    # https://cloud.google.com/compute/docs/disks/performance#zonal_pd
    # Even though we don't need 200 GiB of capacity, this will give us 96 MiB/s throughput.
    bootDisk.size = 200;
  };
  resource.google_sql_database_instance.prod = {
    settings = {
      edition = "ENTERPRISE";
      tier = "db-f1-micro";
    };
  };
  # GKE cluster autoprovisioning limits are configured in ./gke.nix
  k8s.prod.deployment.regsite = {
    replicas = 1;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "512Mi";
      requests.cpu = "10m";
      requests.memory = "256Mi";
    };
  };
  k8s.prod.deployment.api = {
    replicas = 1;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "512Mi";
      requests.cpu = "50m";
      requests.memory = "384Mi";
    };
  };
  k8s.prod.deployment.ui = {
    replicas = 1;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "512Mi";
      requests.cpu = "75m";
      requests.memory = "384Mi";
    };
  };
  k8s.prod.deployment.ws = {
    replicas = 1;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "768Mi";
      requests.cpu = "50m";
      requests.memory = "512Mi";
    };
    deployment.spec.strategy.rolling_update = {
      max_surge = "100%";
      max_unavailable = "0%";
    };
  };
  k8s.prod.deployment.inteng = {
    replicas = 1;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "768Mi";
      requests.cpu = "10m";
      requests.memory = "384Mi";
    };
  };
  k8s.prod.deployment.ops = {
    replicas = 1;
    container.resources = {
      limits.cpu = "500m";
      limits.memory = "256Mi";
      requests.cpu = "10m";
      requests.memory = "128Mi";
    };
  };
  # k8s.prod.statefulSet.sync2k8s = {
  #   container.resources = {
  #     limits.cpu = "1.5";
  #     limits.memory = "4Gi";
  #     requests.cpu = "1";
  #     requests.memory = "4Gi";
  #   };
  # };
  k8s.prod.statefulSet.redis = {
    container.resources = {
      limits.cpu = "2";
      limits.memory = "1Gi";
      requests.cpu = "100m";
      requests.memory = "256Mi";
    };
  };
}
