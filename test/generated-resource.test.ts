import * as pulumi from "@pulumi/pulumi";
import { VirtualService } from "../networking/v1/virtualService";
import { describe, expect, it } from "vitest";

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

describe("generated Istio CRD resources", () => {
  it("constructs a typed VirtualService with generated API defaults", async () => {
    const virtualService = new VirtualService("route", {
      metadata: {
        name: "route",
      },
      spec: {
        hosts: ["example.com"],
        http: [
          {
            route: [
              {
                destination: {
                  host: "hello.default.svc.cluster.local",
                  port: {
                    number: 80,
                  },
                },
              },
            ],
          },
        ],
      },
    });

    expect(VirtualService.isInstance(virtualService)).toBe(true);
    expect(VirtualService.__pulumiType).toBe(
      "kubernetes:networking.istio.io/v1:VirtualService",
    );
    await expect(outputValue(virtualService.apiVersion)).resolves.toBe(
      "networking.istio.io/v1",
    );
    await expect(outputValue(virtualService.kind)).resolves.toBe("VirtualService");
    await expect(outputValue(virtualService.metadata)).resolves.toMatchObject({
      name: "route",
    });
  });
});

async function outputValue<T>(output: pulumi.Output<T>): Promise<T> {
  return (output as unknown as { promise: () => Promise<T> }).promise();
}
