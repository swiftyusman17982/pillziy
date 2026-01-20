export const api = {
        earlyAccess: {
                create: {
                        path: "/api/early-access",
                        method: "POST",
                },
        },
        demoRequest: {
                create: {
                        path: "/api/demo-request",
                        method: "POST",
                },
        },
        investorRequest: {
                create: {
                        path: "/api/investor-request",
                        method: "POST",
                },
        },
} as const;
