/**
 * NETBOX HELPERS
 * Handles authenticated communication with the NetBox REST API.
 */

const NETBOX_URL = process.env.NETBOX_URL || "http://127.0.0.1:8000";

// --- UNIVERSAL GET HELPER ---
export async function netboxQuery(endpoint: string, token: string) {
  try {
    const res = await fetch(`${NETBOX_URL}${endpoint}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error(`NetBox Error: ${res.status}`);
    return await res.json();
  } catch (e) {
    return {
      error: true,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

// --- UNIVERSAL POST HELPER (Create/Reserve) ---
export async function netboxProvision(
  token: string,
  address?: string,
  description: string = "Provisioned via ChatOps",
  prefixId: number = 1
) {
  try {
    const endpoint = !address
      ? `/api/ipam/prefixes/${prefixId}/available-ips/`
      : `/api/ipam/ip-addresses/`;

    const body = !address
      ? { description, status: "active" }
      : { address, description, status: "active" };

    const res = await fetch(`${NETBOX_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Provisioning Failed: ${res.status}`);
    return await res.json();
  } catch (e) {
    return {
      error: true,
      message: e instanceof Error ? e.message : "Failed to provision",
    };
  }
}

// --- UNIVERSAL PATCH HELPER (Update) ---
export async function netboxUpdate(
  token: string,
  id: number,
  data: { description?: string; status?: string }
) {
  try {
    const res = await fetch(`${NETBOX_URL}/api/ipam/ip-addresses/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Update Failed: ${res.status}`);
    return await res.json();
  } catch (e) {
    return {
      error: true,
      message: e instanceof Error ? e.message : "Failed to update record",
    };
  }
}
