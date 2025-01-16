{ config, lib, pkgs, ... }:
{
  # The cluster needs to be created in a submodule so the cluster is available when instantiating the kubernetes provider.
  # https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs#stacking-with-managed-kubernetes-cluster-resources
  module.gke-cluster.source = lib.mkTFModule [{
    terraform.required_providers = {
      inherit (config.terraform.required_providers) google;
    };
    gcp.services.container.enable = true;
    gcp.serviceAccount.gke-k8s-node = {
      displayName = "K8s node service account";
      iamRoles = [
        "container.defaultNodeServiceAccount"
      ];
    };
    resource.google_container_cluster.k8s = {
      depends_on = ["google_project_service.container"];
      # gcloud beta container --project "mitmh2025" clusters create "k8s"
      name = "k8s";
      location = config.provider.google.zone; # --zone "us-east5-a"
      node_locations = []; # --node-locations "us-east5-a"
      release_channel.channel = "REGULAR"; # --release-channel "regular"

      # Let auto-provisioning handle all node pools.
      remove_default_node_pool = true;
      initial_node_count = 1; # --num-nodes "1"

      # DEFAULT --tier "standard"
      # DEFAULT --no-enable-basic-auth
      # --cluster-version "1.30.5-gke.1443001"
      # --machine-type "e2-medium"
      # UNNEEDED --metadata disable-legacy-endpoints=true
      # UNNEEDED --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append"
      logging_config.enable_components = ["SYSTEM_COMPONENTS" "WORKLOADS"]; # --logging=SYSTEM,WORKLOAD
      monitoring_config.enable_components = ["SYSTEM_COMPONENTS"]; # --monitoring=SYSTEM
      networking_mode = "VPC_NATIVE"; # --enable-ip-alias
      # DEFAULT --network "projects/mitmh2025/global/networks/default"
      # DEFAULT --subnetwork "projects/mitmh2025/regions/us-east5/subnetworks/default"
      enable_intranode_visibility = false; # --no-enable-intra-node-visibility
      # More than 110 pods per node costs ~1 vCPU per node.
      default_max_pods_per_node = 110; # --default-max-pods-per-node "110"
      # UNNEEDED --enable-autoscaling
      # UNNEEDED --min-nodes "0"
      # UNNEEDED --max-nodes "1"
      # UNNEEDED --location-policy "BALANCED"
      control_plane_endpoints_config.dns_endpoint_config.allow_external_traffic = true; # --enable-dns-access
      # --enable-ip-access
      security_posture_config.mode = "BASIC"; # --security-posture=standard
      security_posture_config.vulnerability_mode = "VULNERABILITY_DISABLED"; # --workload-vulnerability-scanning=disabled
      datapath_provider = "ADVANCED_DATAPATH"; # --enable-dataplane-v2
      # --no-enable-master-authorized-networks
      # --no-enable-google-cloud-access
      addons_config = {
        # --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver
        horizontal_pod_autoscaling.disabled = false;
        http_load_balancing.disabled = false;
        gce_persistent_disk_csi_driver_config.enabled = true;
      };
      # UNNEEDED --enable-autoupgrade
      # UNNEEDED --enable-autorepair
      # UNNEEDED --max-surge-upgrade 1
      # UNNEEDED --max-unavailable-upgrade 0
      maintenance_policy = {
        recurring_window = {
          start_time = "2024-11-14T05:00:00Z"; # --maintenance-window-start "2024-11-14T05:00:00Z"
          end_time = "2024-11-15T05:00:00Z"; # --maintenance-window-end "2024-11-15T05:00:00Z"
          # Never do maintenance on Fri/Sat/Sun/Mon
          recurrence = "FREQ=WEEKLY;BYDAY=TU,WE,TH"; # --maintenance-window-recurrence "FREQ=WEEKLY;BYDAY=TU,WE,TH"
        };
        maintenance_exclusion = {
          exclusion_name = "Hunt 2025";
          start_time = "2025-01-16T00:00:00Z";
          end_time = "2025-01-22T00:00:00Z";
          exclusion_options.scope = "NO_UPGRADES";
        };
      };
      binary_authorization.evaluation_mode = "DISABLED"; # --binauthz-evaluation-mode=DISABLED
      cluster_autoscaling = {
        enabled = true; # --enable-autoprovisioning
        resource_limits = [
          # Note that these limits are *per-cluster*, not per-node.
          {
            resource_type = "cpu";
            minimum = 1;
            maximum = 96;
          }
          {
            resource_type = "memory";
            minimum = 1;
            maximum = 384;
          }
        ];
        auto_provisioning_locations = [
          config.provider.google.zone
        ]; # --autoprovisioning-locations=us-east5-a
        auto_provisioning_defaults = {
          image_type = "COS_CONTAINERD"; # --image-type "COS_CONTAINERD"
          disk_type = "pd-balanced"; # --disk-type "pd-balanced"
          disk_size = "25"; # --disk-size "25"
          service_account = lib.tfRef "google_service_account.gke-k8s-node.email";
          management = {
            auto_repair = true; # --enable-autoprovisioning-autorepair
            auto_upgrade = true; # --enable-autoprovisioning-autoupgrade
          };
          upgrade_settings.max_surge = 1; # --autoprovisioning-max-surge-upgrade 1
          upgrade_settings.max_unavailable = 0; # --autoprovisioning-max-unavailable-upgrade 0
          shielded_instance_config = {
            enable_integrity_monitoring = true;
            enable_secure_boot = false;
          };
        };
        #autoscaling_profile = "OPTIMIZE_UTILIZATION"; # --autoscaling-profile optimize-utilization
        autoscaling_profile = "BALANCED";
      };
      node_pool_auto_config.network_tags.tags = [
        "gke-k8s"
        "gke-k8s-node"
      ];
      monitoring_config.managed_prometheus.enabled = false; # --no-enable-managed-prometheus
      workload_identity_config.workload_pool = "${lib.tfRef "data.google_project.this.project_id"}.svc.id.goog"; # --workload-pool "mitmh2025.svc.id.goog"
      enable_shielded_nodes = true; # --enable-shielded-nodes
      secret_manager_config.enabled = true; # --enable-secret-manager
    };
  }];
  gcp.ar.images.readers = [(lib.tfRef "module.gke-cluster.google_service_account.gke-k8s-node.member")];

  # Configure kubernetes provider with Oauth2 access token.
  # https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/client_config
  # This fetches a new token, which will expire in 1 hour.
  data.google_client_config.default = {
    depends_on = ["module.gke-cluster"];
  };

  # Defer reading the cluster data until the GKE cluster exists.
  data.google_container_cluster.k8s = {
    name = "k8s";
    location = config.provider.google.zone;
    depends_on = ["module.gke-cluster"];
  };

  provider.kubernetes = {
    host  = "https://${lib.tfRef "data.google_container_cluster.k8s.endpoint"}";
    token = lib.tfRef "data.google_client_config.default.access_token";
    cluster_ca_certificate = lib.tfRef ''
      base64decode(
        data.google_container_cluster.k8s.master_auth[0].cluster_ca_certificate,
      )
    '';
  };

  resource.kubernetes_namespace_v1.prod.metadata.name = "prod";

  # Service account for the API to talk to Postgres
  gcp.serviceAccount.k8s-prod-api = {
    displayName = "k8s/prod/api";
    iamRoles = [
      "cloudsql.client"
      "cloudsql.instanceUser"
    ];
  };
  resource.google_service_account_iam_binding.k8s-prod-api = {
    depends_on = ["module.gke-cluster"];
    service_account_id = lib.tfRef "google_service_account.k8s-prod-api.name";
    role = "roles/iam.workloadIdentityUser";

    members = [
      "serviceAccount:${lib.tfRef "data.google_project.this.project_id"}.svc.id.goog[prod/api]"
    ];
  };
  resource.kubernetes_service_account_v1.k8s-prod-api = {
    metadata = {
      name = "api";
      namespace = lib.tfRef "kubernetes_namespace_v1.prod.metadata[0].name";
      annotations."iam.gke.io/gcp-service-account" = lib.tfRef "google_service_account.k8s-prod-api.email";
    };
  };
}
