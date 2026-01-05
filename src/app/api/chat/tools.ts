export const NETBOX_TOOLS = [
  {
    name: "netbox_system_status",
    description:
      "Check the operational status, version, and heartbeat of the NetBox instance. Use this for 'system check' or 'are you connected' questions.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "netbox_inspect_prefix",
    description:
      "Fetch utilization stats and metadata for a network prefix (like 10.0.0.0/24). Use this to see how 'full' a network is.",
    parameters: {
      type: "object",
      properties: {
        prefixId: {
          type: "number",
          description:
            "The ID of the prefix to inspect. Default is 1 for the 10.0.0.0/24 demo.",
          default: 1,
        },
      },
    },
  },
  {
    name: "netbox_search",
    description:
      "Search the IPAM database for specific IPs, devices, or descriptions. Use this when the user asks 'Where is X?' or 'Who has IP Y?'.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "The search term, e.g., 'printer', '10.0.0.5', or 'web-server'.",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "netbox_reserve_next_ip",
    description:
      "Automatically find and reserve the next available IP in a prefix. Use this for 'get me a new IP' or 'provision an address' requests. Default prefix is 1 with 10.0.0.0/24 being the demo network.",
    parameters: {
      type: "object",
      properties: {
        prefixId: { type: "number", default: 1 },
        description: {
          type: "string",
          description:
            "Purpose of this IP, e.g., 'Temporary Scanner' or 'Operator Laptop'.",
        },
        status: {
          type: "string",
          enum: ["active", "reserved", "deprecated"],
          default: "active",
          description: "The operational status to assign to the new IP.",
        },
      },
      required: ["description"],
    },
  },
  {
    name: "netbox_update_ip",
    description:
      "Modify an existing IP address record. Use this to change the description, label, or status of an IP that already exists.",
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The internal NetBox ID of the IP record.",
        },
        description: {
          type: "string",
          description: "The new description to apply.",
        },
        status: {
          type: "string",
          enum: ["active", "reserved", "deprecated", "offline"],
        },
      },
      required: ["id"],
    },
  },
  {
    name: "netbox_get_history",
    description:
      "Access the 'Object Changes' audit log. Use this for 'What happened?', 'Who changed the network?', or 'Show me history' questions.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of recent changes to fetch. Default is 5.",
          default: 5,
        },
      },
    },
  },
];

export const SYSTEM_PROMPT = `
You are a NetBox Automation Operator. You are NOT a teacher or a guide. You execute tools immediately.
- NEVER explain how to use the API. 
- NEVER provide curl commands or "steps to take."
- ALWAYS execute the appropriate tool immediately to fulfill a request.
- For history/logs/changelogs: use 'get_recent_changes'.
- If a user provides a specific IP address (e.g., 10.0.0.50), you MUST pass that exact address to the provision tool.
- If no specific IP is mentioned, use the next-available logic.
- Use 'netbox_query' to see what exists.
- Use 'netbox_provision' to create new IPs.
`;
