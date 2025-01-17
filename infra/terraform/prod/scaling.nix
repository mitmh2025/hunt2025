{
  gce.instance.deploy = {
    machineType = "e2-standard-8"; # 8 vCPU, 32 GB RAM
    # SSD persistent disks have a limit of 30 IOPS and 0.48 MiB/s per GiB of capacity.
    # https://cloud.google.com/compute/docs/disks/performance#zonal_pd
    # Even though we don't need 200 GiB of capacity, this will give us 96 MiB/s throughput.
    bootDisk.size = 200;
  };
  gce.instance.media = {
    machineType = "e2-highcpu-32"; # 32 vCPU, 32 GB RAM
    # 64 Kbps * 200 teams * 72 hours ≈ 400 GB
    bootDisk.size = 1000;
  };
  gce.instance.things = {
    machineType = "e2-standard-4"; # 4 vCPU, 16 GB RAM
    bootDisk.size = 50;
  };
  gce.instance.tix = {
    machineType = "e2-standard-4"; # 4 vCPU, 16 GB RAM
    bootDisk.size = 200;
  };
  resource.google_sql_database_instance.prod = {
    settings = {
      # edition = "ENTERPRISE";
      # tier = "db-f1-micro";
      edition = "ENTERPRISE_PLUS";
      tier = "db-perf-optimized-N-4";
    };
  };
  # GKE cluster autoprovisioning limits are configured in ./gke.nix
  k8s.prod.deployment.regsite = {
    replicas = 2;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.deployment.api = {
    replicas = 4;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.deployment.ui = {
    replicas = 12;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.deployment.ws = {
    replicas = 6;
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
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
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.deployment.ops = {
    replicas = 2;
    container.resources = {
      limits.cpu = "500m";
      limits.memory = "1Gi";
      requests.cpu = "500m";
      requests.memory = "512Mi";
    };
  };
  k8s.prod.statefulSet.sync2k8s = {
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.statefulSet.redis = {
    container.resources = {
      limits.cpu = "8";
      limits.memory = "16Gi";
      requests.cpu = "4";
      requests.memory = "16Gi";
    };
  };
  k8s.prod.statefulSet.sync2tb = {
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
  k8s.prod.statefulSet.sync2zammad = {
    container.resources = {
      limits.cpu = "1.5";
      limits.memory = "4Gi";
      requests.cpu = "1";
      requests.memory = "4Gi";
    };
  };
}