export default {
  cleanEntries: [
    "extensions",
    "networking",
    "security",
    "telemetry",
  ],
  sources: [
    {
      name: "istio",
      version: "1.30.1",
      url: "https://raw.githubusercontent.com/istio/istio/1.30.1/manifests/charts/base/files/crd-all.gen.yaml",
    },
  ],
};
