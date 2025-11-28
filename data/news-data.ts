export type NewsCategory = "event" | "announcement" | "success";

export interface NewsTranslation {
  title: string;
  excerpt: string;
  content: string;
}

export interface News extends NewsTranslation {
  id: number;
  slug: string;
  category: NewsCategory;
  image: string;
  date: string; // Format: YYYY-MM-DD
}

// Base news data (language-independent)
export const newsBase: Omit<News, "title" | "excerpt" | "content">[] = [
  {
    id: 1,
    slug: "rentree-academique-2024-2025",
    category: "announcement",
    image: "/images/news/rentree-2024.jpg",
    date: "2024-09-15",
  },
  {
    id: 2,
    slug: "journee-portes-ouvertes-octobre",
    category: "event",
    image: "/images/news/portes-ouvertes.jpg",
    date: "2024-10-05",
  },
  {
    id: 3,
    slug: "ceremonie-remise-diplomes-2024",
    category: "success",
    image: "/images/news/diplomes-2024.jpg",
    date: "2024-08-20",
  },
  {
    id: 4,
    slug: "nouveau-partenariat-cemeces",
    category: "announcement",
    image: "/images/news/partenariat-cemeces.jpg",
    date: "2024-07-10",
  },
  {
    id: 5,
    slug: "stage-pratique-massotherapie",
    category: "event",
    image: "/images/news/stage-massotherapie.jpg",
    date: "2024-06-25",
  },
  {
    id: 6,
    slug: "reussite-examens-2024",
    category: "success",
    image: "/images/news/reussite-2024.jpg",
    date: "2024-06-15",
  },
];

// French translations
export const newsTranslationsFr: NewsTranslation[] = [
  {
    title: "Rentrée Académique 2024-2025 : Bienvenue à l'INSES",
    excerpt: "L'INSES ouvre ses portes pour l'année académique 2024-2025. Les inscriptions sont ouvertes pour toutes nos filières de formation.",
    content: `
      <p>C'est avec grand plaisir que l'Institut Supérieur de l'Espoir (INSES) accueille ses nouveaux et anciens étudiants pour l'année académique 2024-2025.</p>

      <h3>Informations importantes</h3>
      <ul>
        <li>Date de début des cours : 1er octobre 2024</li>
        <li>Inscriptions ouvertes jusqu'au 25 septembre 2024</li>
        <li>6 filières de formation disponibles</li>
        <li>Stages pratiques garantis dans nos établissements partenaires</li>
      </ul>

      <p>Notre équipe pédagogique expérimentée est prête à vous accompagner tout au long de votre parcours de formation dans le domaine de la santé.</p>

      <p>Pour plus d'informations ou pour vous inscrire, n'hésitez pas à nous contacter ou à visiter notre campus à Douala-Bonabéri.</p>
    `,
  },
  {
    title: "Journée Portes Ouvertes : Samedi 12 Octobre 2024",
    excerpt: "Venez découvrir l'INSES lors de notre journée portes ouvertes. Visite du campus, rencontre avec les enseignants et démonstrations pratiques.",
    content: `
      <p>L'INSES organise une journée portes ouvertes le samedi 12 octobre 2024 de 9h à 16h. Une occasion unique de découvrir nos installations et nos formations.</p>

      <h3>Au programme</h3>
      <ul>
        <li>Visite guidée du campus et des laboratoires</li>
        <li>Présentation de toutes nos filières de formation</li>
        <li>Démonstrations pratiques par nos étudiants</li>
        <li>Rencontre avec nos enseignants et anciens étudiants</li>
        <li>Session de questions-réponses</li>
        <li>Informations sur les modalités d'inscription</li>
      </ul>

      <p>Venez nombreux avec vos familles ! Entrée libre et gratuite.</p>

      <p><strong>Lieu :</strong> INSES Campus, Douala-Bonabéri<br>
      <strong>Horaires :</strong> 9h - 16h<br>
      <strong>Contact :</strong> +237 233 XX XX XX</p>
    `,
  },
  {
    title: "Cérémonie de Remise des Diplômes 2024 : 150 Nouveaux Professionnels",
    excerpt: "L'INSES a célébré la réussite de 150 étudiants lors de la cérémonie de remise des diplômes 2024. Félicitations à tous nos nouveaux diplômés !",
    content: `
      <p>La cérémonie de remise des diplômes de la promotion 2024 s'est tenue le 20 août dans une ambiance festive et émouvante. 150 étudiants ont reçu leur diplôme dans différentes filières de la santé.</p>

      <h3>Répartition des diplômés</h3>
      <ul>
        <li>Délégué Médical : 35 diplômés</li>
        <li>Secrétariat Médical : 28 diplômés</li>
        <li>Massothérapie : 25 diplômés</li>
        <li>Aide Chimiste Biologiste : 22 diplômés</li>
        <li>Diététique et Nutrition : 20 diplômés</li>
        <li>Vendeur en Pharmacie : 20 diplômés</li>
      </ul>

      <h3>Taux de réussite exceptionnel</h3>
      <p>Avec un taux de réussite de 95%, la promotion 2024 confirme l'excellence de la formation dispensée à l'INSES. Nos diplômés sont déjà recherchés par les établissements de santé de la région.</p>

      <p>Félicitations à tous nos nouveaux professionnels de santé ! Nous sommes fiers de vous et vous souhaitons une brillante carrière.</p>
    `,
  },
  {
    title: "Nouveau Partenariat avec CEMECES : Plus d'Opportunités de Stages",
    excerpt: "L'INSES renforce son partenariat avec la Clinique CEMECES, offrant davantage d'opportunités de stages pratiques à nos étudiants.",
    content: `
      <p>Nous sommes heureux d'annoncer le renforcement de notre partenariat stratégique avec la Clinique Médico-chirurgicale de l'Espoir (CEMECES).</p>

      <h3>Avantages pour nos étudiants</h3>
      <ul>
        <li>Accès prioritaire aux stages pratiques</li>
        <li>Encadrement par des professionnels expérimentés</li>
        <li>Équipements médicaux modernes</li>
        <li>Possibilités d'emploi après obtention du diplôme</li>
        <li>Formation en conditions réelles</li>
      </ul>

      <p>Ce partenariat garantit à tous nos étudiants une formation pratique de qualité, complément essentiel à l'enseignement théorique dispensé à l'INSES.</p>

      <p>D'autres partenariats avec des établissements de santé de la région du Littoral sont également en cours de finalisation.</p>
    `,
  },
  {
    title: "Stage Pratique de Massothérapie : Une Expérience Enrichissante",
    excerpt: "Les étudiants en Massothérapie ont participé à un stage pratique intensif au centre de bien-être partenaire. Retour sur cette expérience formatrice.",
    content: `
      <p>Du 10 au 25 juin 2024, nos étudiants de 2ème année en Massothérapie ont effectué un stage pratique intensif dans notre centre partenaire.</p>

      <h3>Compétences développées</h3>
      <ul>
        <li>Techniques de massage thérapeutique</li>
        <li>Massages de relaxation et bien-être</li>
        <li>Prise en charge de clients réels</li>
        <li>Gestion du stress et relation client</li>
        <li>Respect des protocoles d'hygiène</li>
      </ul>

      <h3>Témoignage d'étudiants</h3>
      <p><em>"Ce stage m'a permis de mettre en pratique tout ce que nous avons appris en cours. J'ai gagné en confiance et je me sens prête à exercer le métier."</em> - Marie, étudiante en 2ème année</p>

      <p>Ces stages pratiques sont une composante essentielle de notre approche pédagogique, garantissant que nos diplômés sont immédiatement opérationnels sur le marché du travail.</p>
    `,
  },
  {
    title: "Excellents Résultats aux Examens 2024 : 95% de Taux de Réussite",
    excerpt: "Les résultats des examens de fin d'année 2024 sont tombés : un taux de réussite de 95% qui témoigne de la qualité de notre enseignement.",
    content: `
      <p>Nous sommes fiers d'annoncer les excellents résultats de nos étudiants aux examens de fin d'année académique 2023-2024.</p>

      <h3>Résultats par filière</h3>
      <ul>
        <li>Délégué Médical : 97% de réussite</li>
        <li>Secrétariat Médical : 96% de réussite</li>
        <li>Massothérapie : 94% de réussite</li>
        <li>Aide Chimiste Biologiste : 95% de réussite</li>
        <li>Diététique et Nutrition : 93% de réussite</li>
        <li>Vendeur en Pharmacie : 96% de réussite</li>
      </ul>

      <h3>Les clés du succès</h3>
      <p>Ces excellents résultats sont le fruit de :</p>
      <ul>
        <li>Un corps enseignant qualifié et dévoué</li>
        <li>Une approche pédagogique moderne et efficace</li>
        <li>Des évaluations continues tout au long de l'année</li>
        <li>Un accompagnement personnalisé de chaque étudiant</li>
        <li>Des stages pratiques de qualité</li>
      </ul>

      <p>Félicitations à tous nos étudiants pour leur travail et leur détermination !</p>
    `,
  },
];

// English translations
export const newsTranslationsEn: NewsTranslation[] = [
  {
    title: "Academic Year 2024-2025: Welcome to INSES",
    excerpt: "INSES opens its doors for the 2024-2025 academic year. Registrations are open for all our training programs.",
    content: `
      <p>It is with great pleasure that the Institut Supérieur de l'Espoir (INSES) welcomes its new and returning students for the 2024-2025 academic year.</p>

      <h3>Important Information</h3>
      <ul>
        <li>Classes start: October 1, 2024</li>
        <li>Registration open until September 25, 2024</li>
        <li>6 training programs available</li>
        <li>Guaranteed practical internships in our partner facilities</li>
      </ul>

      <p>Our experienced teaching staff is ready to support you throughout your healthcare training journey.</p>

      <p>For more information or to register, please contact us or visit our campus in Douala-Bonabéri.</p>
    `,
  },
  {
    title: "Open House Day: Saturday, October 12, 2024",
    excerpt: "Come discover INSES during our open house day. Campus tour, meet teachers, and practical demonstrations.",
    content: `
      <p>INSES is organizing an open house day on Saturday, October 12, 2024, from 9am to 4pm. A unique opportunity to discover our facilities and programs.</p>

      <h3>Program</h3>
      <ul>
        <li>Guided tour of campus and laboratories</li>
        <li>Presentation of all our training programs</li>
        <li>Practical demonstrations by our students</li>
        <li>Meet our teachers and alumni</li>
        <li>Q&A session</li>
        <li>Registration information</li>
      </ul>

      <p>Come with your families! Free admission.</p>

      <p><strong>Location:</strong> INSES Campus, Douala-Bonabéri<br>
      <strong>Hours:</strong> 9am - 4pm<br>
      <strong>Contact:</strong> +237 233 XX XX XX</p>
    `,
  },
  {
    title: "2024 Graduation Ceremony: 150 New Healthcare Professionals",
    excerpt: "INSES celebrated the success of 150 students at the 2024 graduation ceremony. Congratulations to all our graduates!",
    content: `
      <p>The graduation ceremony for the class of 2024 took place on August 20 in a festive and emotional atmosphere. 150 students received their diplomas in various healthcare fields.</p>

      <h3>Graduate Distribution</h3>
      <ul>
        <li>Medical Representative: 35 graduates</li>
        <li>Medical Secretary: 28 graduates</li>
        <li>Massage Therapy: 25 graduates</li>
        <li>Laboratory Assistant Chemist: 22 graduates</li>
        <li>Dietetics and Nutrition: 20 graduates</li>
        <li>Pharmacy Sales: 20 graduates</li>
      </ul>

      <h3>Exceptional Success Rate</h3>
      <p>With a 95% success rate, the class of 2024 confirms the excellence of training provided at INSES. Our graduates are already sought after by healthcare facilities in the region.</p>

      <p>Congratulations to all our new healthcare professionals! We are proud of you and wish you a brilliant career.</p>
    `,
  },
  {
    title: "New Partnership with CEMECES: More Internship Opportunities",
    excerpt: "INSES strengthens its partnership with CEMECES Clinic, offering more practical internship opportunities to our students.",
    content: `
      <p>We are pleased to announce the strengthening of our strategic partnership with the Clinique Médico-chirurgicale de l'Espoir (CEMECES).</p>

      <h3>Benefits for Our Students</h3>
      <ul>
        <li>Priority access to practical internships</li>
        <li>Supervision by experienced professionals</li>
        <li>Modern medical equipment</li>
        <li>Employment opportunities after graduation</li>
        <li>Training in real conditions</li>
      </ul>

      <p>This partnership guarantees all our students quality practical training, an essential complement to the theoretical teaching provided at INSES.</p>

      <p>Other partnerships with healthcare facilities in the Littoral region are also being finalized.</p>
    `,
  },
  {
    title: "Massage Therapy Practical Internship: An Enriching Experience",
    excerpt: "Massage Therapy students participated in an intensive practical internship at our partner wellness center. Review of this training experience.",
    content: `
      <p>From June 10 to 25, 2024, our 2nd-year Massage Therapy students completed an intensive practical internship at our partner center.</p>

      <h3>Skills Developed</h3>
      <ul>
        <li>Therapeutic massage techniques</li>
        <li>Relaxation and wellness massages</li>
        <li>Handling real clients</li>
        <li>Stress management and client relations</li>
        <li>Hygiene protocol compliance</li>
      </ul>

      <h3>Student Testimonial</h3>
      <p><em>"This internship allowed me to put into practice everything we learned in class. I gained confidence and feel ready to practice the profession."</em> - Marie, 2nd-year student</p>

      <p>These practical internships are an essential component of our pedagogical approach, ensuring that our graduates are immediately operational in the job market.</p>
    `,
  },
  {
    title: "Excellent 2024 Exam Results: 95% Success Rate",
    excerpt: "The 2024 end-of-year exam results are in: a 95% success rate that testifies to the quality of our teaching.",
    content: `
      <p>We are proud to announce the excellent results of our students in the 2023-2024 end-of-year exams.</p>

      <h3>Results by Program</h3>
      <ul>
        <li>Medical Representative: 97% success</li>
        <li>Medical Secretary: 96% success</li>
        <li>Massage Therapy: 94% success</li>
        <li>Laboratory Assistant Chemist: 95% success</li>
        <li>Dietetics and Nutrition: 93% success</li>
        <li>Pharmacy Sales: 96% success</li>
      </ul>

      <h3>Keys to Success</h3>
      <p>These excellent results are the fruit of:</p>
      <ul>
        <li>A qualified and dedicated teaching staff</li>
        <li>A modern and effective pedagogical approach</li>
        <li>Continuous assessments throughout the year</li>
        <li>Personalized support for each student</li>
        <li>Quality practical internships</li>
      </ul>

      <p>Congratulations to all our students for their hard work and determination!</p>
    `,
  },
];
