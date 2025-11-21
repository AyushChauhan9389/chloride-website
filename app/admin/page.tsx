"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  role?: string;
  plan?: string;
}

interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: Record<string, boolean>;
}

interface Plan {
  id: number;
  name: string;
  fileLimit: number;
  storageLimit: string;
}

interface UserByRole {
  id: number;
  email: string;
  roleId: number;
  planId: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "roles" | "plans">("users");

  // Data states
  const [roles, setRoles] = useState<Role[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [usersByRole, setUsersByRole] = useState<UserByRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("USER");

  // Form states
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanFileLimit, setNewPlanFileLimit] = useState("");
  const [newPlanStorageLimit, setNewPlanStorageLimit] = useState("");

  // UI states
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Check if user is admin
      if (parsedUser.role !== "ADMIN") {
        router.push("/dashboard");
        return;
      }

      fetchRoles(token);
      fetchPlans(token);
      fetchUsersByRole(token, "USER");
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const getToken = () => localStorage.getItem("token") || "";

  const fetchRoles = async (token: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/roles/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    }
  };

  const fetchPlans = async (token: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/plans/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    }
  };

  const fetchUsersByRole = async (token: string, roleName: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/roles/admin/users/${roleName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsersByRole(data.users || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const createRole = async () => {
    if (!newRoleName) return;
    setActionLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/roles/admin/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newRoleName,
          description: newRoleDesc,
          permissions: {
            canManageRoles: false,
            canManagePlans: false,
            canViewAllUsers: false,
            canDeleteAnyFile: false,
            canAccessAnalytics: false,
          },
        }),
      });

      if (response.ok) {
        showMessage("success", "Role created successfully");
        setNewRoleName("");
        setNewRoleDesc("");
        fetchRoles(getToken());
      } else {
        const data = await response.json();
        showMessage("error", data.message || "Failed to create role");
      }
    } catch (err) {
      showMessage("error", "Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteRole = async (roleId: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    setActionLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/roles/admin/${roleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (response.ok) {
        showMessage("success", "Role deleted successfully");
        fetchRoles(getToken());
      } else {
        const data = await response.json();
        showMessage("error", data.message || "Failed to delete role");
      }
    } catch (err) {
      showMessage("error", "Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const createPlan = async () => {
    if (!newPlanName || !newPlanFileLimit || !newPlanStorageLimit) return;
    setActionLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/plans/admin/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPlanName,
          fileLimit: parseInt(newPlanFileLimit),
          storageLimit: newPlanStorageLimit,
        }),
      });

      if (response.ok) {
        showMessage("success", "Plan created successfully");
        setNewPlanName("");
        setNewPlanFileLimit("");
        setNewPlanStorageLimit("");
        fetchPlans(getToken());
      } else {
        const data = await response.json();
        showMessage("error", data.message || "Failed to create plan");
      }
    } catch (err) {
      showMessage("error", "Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const deletePlan = async (planId: number) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    setActionLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/plans/admin/${planId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (response.ok) {
        showMessage("success", "Plan deleted successfully");
        fetchPlans(getToken());
      } else {
        const data = await response.json();
        showMessage("error", data.message || "Failed to delete plan");
      }
    } catch (err) {
      showMessage("error", "Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text as="p" className="text-muted-foreground">Loading...</Text>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Chloride</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-sm text-destructive font-bold">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs hover:underline text-muted-foreground"
            >
              Dashboard
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={handleLogout}
              className="text-xs hover:underline text-destructive"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-destructive/10 border-2 border-destructive rounded-full -z-10 animate-pulse" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-primary/10 border-2 border-primary rounded -z-10 rotate-12" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-accent/10 border-2 border-accent rounded-full -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <Text as="h2" className="text-2xl font-bold mb-2">
              Admin Panel
            </Text>
            <Text as="p" className="text-muted-foreground">
              Manage users, roles, and plans
            </Text>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`mb-6 p-3 rounded border-2 ${
                message.type === "success"
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-destructive/10 border-destructive text-destructive"
              }`}
            >
              <Text as="p" className="text-sm">{message.text}</Text>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              className="border-foreground"
            >
              Users
            </Button>
            <Button
              variant={activeTab === "roles" ? "default" : "outline"}
              onClick={() => setActiveTab("roles")}
              className="border-foreground"
            >
              Roles
            </Button>
            <Button
              variant={activeTab === "plans" ? "default" : "outline"}
              onClick={() => setActiveTab("plans")}
              className="border-foreground"
            >
              Plans
            </Button>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card className="border-foreground border-2 shadow-xl">
              <Card.Header className="border-b-2 border-foreground bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <Card.Title>Users by Role</Card.Title>
                    <Card.Description>View users filtered by role</Card.Description>
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      fetchUsersByRole(getToken(), e.target.value);
                    }}
                    className="border-2 border-foreground rounded px-3 py-1 bg-background"
                  >
                    <option value="USER">USER</option>
                    <option value="STAFF">STAFF</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </Card.Header>
              <Card.Content className="pt-6">
                {usersByRole.length === 0 ? (
                  <Text as="p" className="text-muted-foreground text-center py-4">
                    No users found with role {selectedRole}
                  </Text>
                ) : (
                  <div className="space-y-3">
                    {usersByRole.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between border-2 border-foreground rounded p-3"
                      >
                        <div>
                          <Text as="p" className="font-medium">{u.email}</Text>
                          <Text as="p" className="text-xs text-muted-foreground">
                            ID: {u.id} | Plan ID: {u.planId}
                          </Text>
                        </div>
                        <Badge variant="surface" size="sm">
                          {selectedRole}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Content>
            </Card>
          )}

          {/* Roles Tab */}
          {activeTab === "roles" && (
            <div className="space-y-6">
              {/* Create Role */}
              <Card className="border-foreground border-2 shadow-xl">
                <Card.Header className="border-b-2 border-foreground bg-primary/10">
                  <Card.Title>Create New Role</Card.Title>
                </Card.Header>
                <Card.Content className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="font-bold">Role Name</Label>
                      <Input
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        placeholder="MODERATOR"
                        className="border-2 border-foreground mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-bold">Description</Label>
                      <Input
                        value={newRoleDesc}
                        onChange={(e) => setNewRoleDesc(e.target.value)}
                        placeholder="Role description"
                        className="border-2 border-foreground mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="default"
                        onClick={createRole}
                        disabled={actionLoading || !newRoleName}
                        className="border-foreground w-full"
                      >
                        Create Role
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Existing Roles */}
              <Card className="border-foreground border-2 shadow-xl">
                <Card.Header className="border-b-2 border-foreground bg-muted/30">
                  <Card.Title>Existing Roles</Card.Title>
                  <Card.Description>{roles.length} roles configured</Card.Description>
                </Card.Header>
                <Card.Content className="pt-6">
                  <div className="space-y-3">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center justify-between border-2 border-foreground rounded p-3"
                      >
                        <div>
                          <Text as="p" className="font-bold">{role.name}</Text>
                          <Text as="p" className="text-xs text-muted-foreground">
                            {role.description || "No description"}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="surface" size="sm">ID: {role.id}</Badge>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteRole(role.id)}
                            disabled={actionLoading || ["USER", "STAFF", "ADMIN"].includes(role.name)}
                            className="border-foreground"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === "plans" && (
            <div className="space-y-6">
              {/* Create Plan */}
              <Card className="border-foreground border-2 shadow-xl">
                <Card.Header className="border-b-2 border-foreground bg-accent/10">
                  <Card.Title>Create New Plan</Card.Title>
                </Card.Header>
                <Card.Content className="pt-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <Label className="font-bold">Plan Name</Label>
                      <Input
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                        placeholder="Pro"
                        className="border-2 border-foreground mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-bold">File Limit</Label>
                      <Input
                        type="number"
                        value={newPlanFileLimit}
                        onChange={(e) => setNewPlanFileLimit(e.target.value)}
                        placeholder="100"
                        className="border-2 border-foreground mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-bold">Storage Limit</Label>
                      <Input
                        value={newPlanStorageLimit}
                        onChange={(e) => setNewPlanStorageLimit(e.target.value)}
                        placeholder="1GB"
                        className="border-2 border-foreground mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="default"
                        onClick={createPlan}
                        disabled={actionLoading || !newPlanName || !newPlanFileLimit || !newPlanStorageLimit}
                        className="border-foreground w-full"
                      >
                        Create Plan
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Existing Plans */}
              <Card className="border-foreground border-2 shadow-xl">
                <Card.Header className="border-b-2 border-foreground bg-muted/30">
                  <Card.Title>Existing Plans</Card.Title>
                  <Card.Description>{plans.length} plans available</Card.Description>
                </Card.Header>
                <Card.Content className="pt-6">
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between border-2 border-foreground rounded p-3"
                      >
                        <div>
                          <Text as="p" className="font-bold">{plan.name}</Text>
                          <Text as="p" className="text-xs text-muted-foreground">
                            {plan.fileLimit} files | {plan.storageLimit} storage
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="surface" size="sm">ID: {plan.id}</Badge>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePlan(plan.id)}
                            disabled={actionLoading}
                            className="border-foreground"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
