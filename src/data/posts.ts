/** Articles listed under /writing. Also used by the prerendered page and llms.txt. */
export interface BlogPost {
  title: string;
  summary: string;
  category: string;
  date: string;
  featuredImage: string;
  link: string;
  tags: string[];
}

export const posts: BlogPost[] = [
  {
    title: "Connecting Flutter Frontend with Django Backend",
    summary: "Learn how to integrate your Flutter app with a Django backend for full-stack development.",
    category: "Mobile",
    date: "Oct 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958313/0_lsdQqPVDMNQxIUM__bvi72n.webp",
    link: "https://medium.com/@adugnaliben65/connecting-flutter-frontend-with-django-backend-a-complete-guide-52a75fcc6c94",
    tags: ["Flutter", "Django", "Fullstack"],
  },
  {
    title: "The Unmatched Importance of Python",
    summary: "Explore why Python remains one of the most powerful and versatile programming languages today.",
    category: "Backend",
    date: "Sep 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958499/0_KsGIANg1sUp_OSOQ_jqr764.webp",
    link: "https://medium.com/@adugnaliben65/the-unmatched-importance-of-python-unlocking-the-power-of-modern-programming-6660dc19c46b",
    tags: ["Python", "Programming"],
  },
  {
    title: "Optimizing UI Performance in Flutter",
    summary: "Improve your Flutter app performance with simple UI/UX optimization tips.",
    category: "Mobile",
    date: "Aug 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958315/0_Rdbw_vzDDIKKuP1e_opvbpc.webp",
    link: "https://medium.com/@adugnaliben65/optimizing-ui-performance-in-flutter-simple-tips-for-better-apps-a8835ef3677a",
    tags: ["Flutter", "Performance"],
  },
];
