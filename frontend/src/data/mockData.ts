export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: string;
  percentage: number;
}

export interface SkillGroup {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
  quote: string;
}

// 1. Projects Data
const projects: Project[] = [
  {
    id: 1,
    title: "Website Input Data Sirex",
    category: "Web Dev",
    description: "Web input data dengan fitur lengkap untuk mengelola dan mengorganisir data secara efisien.",
    tech: ["Next.js", "React", "Express.js", "MySQL"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

// 2. Data Skills
const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      { name: "HTML5 / CSS3", level: "Advanced", percentage: 90 },
      { name: "JavaScript (ES6+)", level: "Advanced", percentage: 85 },
      { name: "React.js", level: "Intermediate", percentage: 75 },
      { name: "Next.js (App Router)", level: "Intermediate", percentage: 70 },
      { name: "Tailwind CSS", level: "Intermediate", percentage: 50 },
    ],
  },
  {
    title: "Backend & Database",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: "Intermediate", percentage: 70 },
      { name: "Express.js", level: "Intermediate", percentage: 75 },
      { name: "MySQL", level: "Intermediate", percentage: 90 },
      { name: "RESTful API Development", level: "Intermediate", percentage: 80 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: "Advanced", percentage: 90 },
      { name: "Figma (UI/UX)", level: "Intermediate", percentage: 65 },
      { name: "Postman", level: "Advanced", percentage: 85 },
      { name: "VS Code", level: "Advanced", percentage: 95 },
    ],
  },
];

// 3. Data Sertifikat
const certificates: Certificate[] = [
  {
    id: 1,
    title: "SERTIFIKAT PELATIHAN",
    issuer: "komdigi",
    date: " 2 Juni 2026",
    credentialId: "2299818850-30785/MS/BLSDM.Komdigi/2026",
    verificationUrl: "#",
  },
  
];

// 4. Data Testimoni
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Pak Saad",
    role: "Kepala Sekolah",
    company: "SMK Negeri 1",
    avatar: "👨‍🏫",
    stars: 5,
    quote:
      "Siswa ini menunjukkan dedikasi dan integritas tinggi dalam setiap aktivitas sekolah. Komitmennya terhadap pembelajaran teknologi sangat luar biasa.",
  },
  {
    id: 2,
    name: "Pak Farid",
    role: "Guru Pembimbing BK",
    company: "SMK Negeri 1",
    avatar: "👨‍🏫",
    stars: 5,
    quote:
      "Kepribadiannya yang positif dan cara berkomunikasinya yang baik membuat dia mudah beradaptasi dengan lingkungan dan tim apapun.",
  },
  {
    id: 3,
    name: "Pak Ali",
    role: "Guru Mata Pelajaran",
    company: "SMK Negeri 1",
    avatar: "👨‍🏫",
    stars: 5,
    quote:
      "Ketekunan dan fokusnya dalam belajar patut dijadikan contoh. Dia selalu mengerjakan setiap tugas dengan penuh tanggung jawab.",
  },
  {
    id: 4,
    name: "Pak Alif",
    role: "Mentor Industri",
    company: "Tech Solutions",
    avatar: "👨‍💼",
    stars: 5,
    quote:
      "Keterampilan teknis dan soft skills-nya sudah siap menghadapi dunia kerja industri. Dia adalah talenta muda yang sangat potensial.",
  },
  {
    id: 5,
    name: "Pak Okta",
    role: "Dosen Universitas",
    company: "Universitas Teknologi",
    avatar: "👨‍🎓",
    stars: 5,
    quote:
      "Pemikiran analitis dan kreativitas dalam memecahkan masalah teknis membuat dia menonjol di antara peserta lainnya.",
  },
];

// Fungsi delay simulasi network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProjects(): Promise<Project[]> {
  await delay(1200);
  return projects;
}

export async function getSkills(): Promise<SkillGroup[]> {
  await delay(1000);
  return skillGroups;
}

export async function getCertificates(): Promise<Certificate[]> {
  await delay(1200);
  return certificates;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await delay(800);
  return testimonials;
}