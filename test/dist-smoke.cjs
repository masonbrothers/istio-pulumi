const assert = require("node:assert/strict");
const pulumi = require("@pulumi/pulumi");
const istio = require("../dist/index.js");

pulumi.runtime.setMocks(
  {
    call: (args) => args.inputs,
    newResource: (args) => ({
      id: `${args.name}_id`,
      state: args.inputs,
    }),
  },
  "project",
  "stack",
  false,
);

async function main() {
  const virtualService = new istio.networking.v1.VirtualService("route", {
    metadata: { name: "route" },
    spec: {
      hosts: ["example.com"],
      http: [
        {
          route: [
            {
              destination: {
                host: "hello.default.svc.cluster.local",
                port: { number: 80 },
              },
            },
          ],
        },
      ],
    },
  });

  assert.equal(istio.networking.v1.VirtualService.isInstance(virtualService), true);
  assert.equal(await virtualService.apiVersion.promise(), "networking.istio.io/v1");
  assert.equal(await virtualService.kind.promise(), "VirtualService");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
