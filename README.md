# istio-pulumi

Pulumi TypeScript bindings for Istio CRDs generated with `crd2pulumi`.

This package is generated from a pinned Istio release CRD bundle. It is useful
when Pulumi code needs typed Istio resources such as `VirtualService`,
`Gateway`, `DestinationRule`, `EnvoyFilter`, `AuthorizationPolicy`,
`PeerAuthentication`, `RequestAuthentication`, or `Telemetry`.

## Install

```sh
npm install istio-pulumi @pulumi/kubernetes @pulumi/pulumi
```

## Example

```ts
import { networking } from "istio-pulumi";

new networking.v1.VirtualService("app", {
  metadata: {
    name: "app",
    namespace: "default",
  },
  spec: {
    hosts: ["app.example.com"],
    http: [
      {
        route: [
          {
            destination: {
              host: "app.default.svc.cluster.local",
            },
          },
        ],
      },
    ],
  },
});
```

## Generate

```sh
pnpm generate:crds
```

The CRDs currently come from Istio `1.30.1`.

For local regeneration, clone `masonbrothers/crd2pulumi-package-tools` as a
sibling directory:

```sh
git clone git@github.com:masonbrothers/crd2pulumi-package-tools.git ../crd2pulumi-package-tools
```

## Publish

GitHub Actions runs install, CRD regeneration, typecheck, and build. Publishing
runs from GitHub Releases with npm provenance and requires an `NPM_TOKEN`
repository secret.
