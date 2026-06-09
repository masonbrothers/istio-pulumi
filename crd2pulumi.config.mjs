export default {
  cleanEntries: [
    "extensions",
    "networking",
    "security",
    "telemetry",
  ],
  downloadTimeoutMs: 30000,
  sources: [
    {
      name: "istio",
      sha256: "dcb43ff6b9af2f629b80b6a82597f5a91db259c757e66cc5353ac007da28351a",
      version: "1.30.1",
      url: "https://raw.githubusercontent.com/istio/istio/1.30.1/manifests/charts/base/files/crd-all.gen.yaml",
    },
  ],
};
