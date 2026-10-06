import { Project, SkillGroup , Certificate, Testimonial } from "./mockData";

const API_BASE = "http://localhost:5000/api"; 

export interface DashboardStats {
    totalProjects: number;
    totalSkills: number;
    totalCertificates: number;
    totalTestimonials: number;
    totalMessages: number;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    created_at: string;
    is_read: number;
}

export interface ProjectPayload {
    title: string;
    category: string;
    description: string;
    tech: string[];
    demo_url: string;
    github_url: string;
}

function parseTech(value: unknown): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string" || !value) return [];

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
    } catch {
        return [value];
    }
}

// fetch projects
export async function fetchProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE}/projects`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.message ||"gagal mengambil fetch projects");
    }

    return json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        tech: parseTech(item.tech),
        demoUrl: item.demo_url,
        githubUrl: item.github_url,
    }));
}


// fetch skills
export async function fetchSkills(): Promise<SkillGroup[]> {
    const response = await fetch(`${API_BASE}/skills`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.message ||"gagal mengambil fetch skills");
    }

    const groupMap:  Map<string, SkillGroup> = new Map();

    json.data.forEach((item: any) => {
        const key = item.group_title;
        
        if (!groupMap.has(key)) {
            groupMap.set(key, {
                title: item.group_title,
                icon: item.group_icon,
                skills: [],
            });
        }

        groupMap.get(key)?.skills.push({
            name: item.name,
            level: item.level,
            percentage: item.percentage,
        });
    });

    return Array.from(groupMap.values());
}

// fetch certificates
export async function fetchCertificates(): Promise<Certificate[]> {
    const response = await fetch(`${API_BASE}/certificates`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.message ||"gagal mengambil fetch certificates");
    }
     
    return json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        issuer: item.issuer,
        date: item.date,
        credentialId: item.credential_id,
        verificationUrl: item.verification_url,
    }));
}

// fetch testimonials
export async function fetchTestimonials(): Promise<Testimonial[]> {
    const response = await fetch(`${API_BASE}/testimonials`);
    const json = await response.json();
    
    if(!json.success) {
        throw new Error(json.message ||"gagal mengambil fetch testimonials");
    }

    return json.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        company: item.company,
        avatar: item.avatar,
        stars: item.stars,
        quote: item.quote,
    }));
}

// fetch pesan kontak
export async function sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    
    const json = await response.json();
    return json;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE}/dashboard/stats`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal mengambil statistik dashboard");
    return json.data;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
    const response = await fetch(`${API_BASE}/messages`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal mengambil pesan");
    return json.data;
}

async function projectRequest(url: string, method: "POST" | "PUT" | "DELETE", data?: ProjectPayload) {
    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal menyimpan proyek");
    return json;
}

export function createProject(data: ProjectPayload) {
    return projectRequest(`${API_BASE}/projects`, "POST", data);
}

export function updateProject(id: number, data: ProjectPayload) {
    return projectRequest(`${API_BASE}/projects/${id}`, "PUT", data);
}

export function deleteProject(id: number) {
    return projectRequest(`${API_BASE}/projects/${id}`, "DELETE");
}

export async function fetchAdminResource(resource: string): Promise<Record<string, unknown>[]> {
    const response = await fetch(`${API_BASE}/admin/${resource}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal mengambil data");
    return json.data;
}

export async function saveAdminResource(resource: string, method: "POST" | "PUT", data: Record<string, unknown>, id?: number) {
    const response = await fetch(`${API_BASE}/admin/${resource}${id ? `/${id}` : ""}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal menyimpan data");
    return json;
}

export async function deleteAdminResource(resource: string, id: number) {
    const response = await fetch(`${API_BASE}/admin/${resource}/${id}`, { method: "DELETE" });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Gagal menghapus data");
}
