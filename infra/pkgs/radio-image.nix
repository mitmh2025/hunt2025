{ dockerTools
, liquidsoap
}: dockerTools.buildLayeredImage {
  name = "radio";
  contents = [
    dockerTools.caCertificates
    liquidsoap
    dockerTools.binSh
  ];
}
