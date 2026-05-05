
export type Lang = "fr" | "en";

export const translations = {
  fr: {

    ping_title: "Latence",
    ping_desc: (ws: number, api: number) =>
      `**WebSocket** — \`${ws}ms\`\n**API** — \`${api}ms\``,


    info_title: "À propos de Scool",
    info_desc:
      "Scool est l'outil scolaire tout-en-un lié à **scool.qzz.io**.\nOrganise ta vie académique directement depuis Discord.",
    info_field_version: "Version",
    info_field_status: "Statut",
    info_field_status_value: "En développement actif",
    info_field_website: "Site web",
    info_field_website_value: "[scool.qzz.io](https://scool.qzz.io)",

 
    help_title: "Commandes disponibles",
    help_desc: "Voici toutes les commandes Scool disponibles pour le moment.",
    help_field_general: "Général",
    help_field_general_value:
      "`/ping` — Latence du bot\n`/info` — Informations sur Scool\n`/invite` — Inviter Scool\n`/soon` — Fonctionnalités à venir",
    help_field_admin: "Administration",
    help_field_admin_value: "`/setup` — Configurer Scool sur ce serveur",


    soon_title: "Bientôt disponible",
    soon_desc:
      "De nombreuses fonctionnalités arrivent bientôt dans le cadre de **scool.qzz.io**.\nReste connecté !",
    soon_field_planned: "Fonctionnalités prévues",
    soon_field_planned_value:
      "📅 Agenda scolaire\n📝 Gestionnaire de devoirs\n📊 Suivi des notes\n👥 Espaces de classe\n🔔 Rappels intelligents",


    invite_title: "Inviter Scool",
    invite_desc: "Ajoute Scool à ton serveur et équipe ta communauté avec des outils scolaires.",
    invite_button: "Inviter Scool",


    setup_title: "Configuration — Scool",
    setup_desc: "Configure Scool pour ce serveur.",
    setup_lang_updated: "Langue mise à jour",
    setup_lang_value: (lang: string) => `Langue définie sur **${lang}**`,
    setup_channel_updated: "Salon d'annonces défini",
    setup_channel_value: (ch: string) => `Salon défini sur ${ch}`,
    setup_role_updated: "Rôle admin défini",
    setup_role_value: (role: string) => `Rôle défini sur ${role}`,
    setup_logs_updated: "Salon de logs défini",
    setup_logs_value: (ch: string) => `Logs envoyés dans ${ch}`,
    setup_no_permission: "Tu dois être **Administrateur** pour utiliser cette commande.",
    setup_summary_title: "Configuration actuelle",
    setup_summary: (lang: string, channel: string, role: string, logs: string) =>
      `🌐 **Langue** — ${lang}\n📢 **Annonces** — ${channel}\n🛡️ **Rôle admin** — ${role}\n📋 **Logs** — ${logs}`,


    welcome_title: "Bonjour, je suis Scool !",
    welcome_desc:
      "Merci de m'avoir invité ! Choisis la langue par défaut pour ce serveur.\nTu pourras toujours modifier ça via `/setup`.",
    welcome_button_fr: "Français",
    welcome_button_en: "English",

    
    error_generic: "Une erreur est survenue. Réessaie plus tard.",
    not_configured: "Ce serveur n'est pas encore configuré. Un administrateur doit lancer `/setup`.",
  },

  en: {
    ping_title: "Latency",
    ping_desc: (ws: number, api: number) =>
      `**WebSocket** — \`${ws}ms\`\n**API** — \`${api}ms\``,

    info_title: "About Scool",
    info_desc:
      "Scool is the all-in-one academic tool linked to **scool.qzz.io**.\nOrganize your school life directly from Discord.",
    info_field_version: "Version",
    info_field_status: "Status",
    info_field_status_value: "Actively in development",
    info_field_website: "Website",
    info_field_website_value: "[scool.qzz.io](https://scool.qzz.io)",

    help_title: "Available commands",
    help_desc: "Here are all the Scool commands currently available.",
    help_field_general: "General",
    help_field_general_value:
      "`/ping` — Bot latency\n`/info` — About Scool\n`/invite` — Invite Scool\n`/soon` — Upcoming features",
    help_field_admin: "Administration",
    help_field_admin_value: "`/setup` — Configure Scool on this server",

    soon_title: "Coming soon",
    soon_desc:
      "Many features are coming as part of **scool.qzz.io**.\nStay tuned!",
    soon_field_planned: "Planned features",
    soon_field_planned_value:
      "📅 Academic planner\n📝 Homework manager\n📊 Grade tracker\n👥 Class spaces\n🔔 Smart reminders",

    invite_title: "Invite Scool",
    invite_desc: "Add Scool to your server and equip your community with academic tools.",
    invite_button: "Invite Scool",

    setup_title: "Setup — Scool",
    setup_desc: "Configure Scool for this server.",
    setup_lang_updated: "Language updated",
    setup_lang_value: (lang: string) => `Language set to **${lang}**`,
    setup_channel_updated: "Announcement channel set",
    setup_channel_value: (ch: string) => `Channel set to ${ch}`,
    setup_role_updated: "Admin role set",
    setup_role_value: (role: string) => `Role set to ${role}`,
    setup_logs_updated: "Logs channel set",
    setup_logs_value: (ch: string) => `Logs will be sent to ${ch}`,
    setup_no_permission: "You need to be an **Administrator** to use this command.",
    setup_summary_title: "Current configuration",
    setup_summary: (lang: string, channel: string, role: string, logs: string) =>
      `🌐 **Language** — ${lang}\n📢 **Announcements** — ${channel}\n🛡️ **Admin role** — ${role}\n📋 **Logs** — ${logs}`,

    welcome_title: "Hello, I'm Scool!",
    welcome_desc:
      "Thanks for inviting me! Choose the default language for this server.\nYou can always change this via `/setup`.",
    welcome_button_fr: "Français",
    welcome_button_en: "English",

    error_generic: "An error occurred. Please try again later.",
    not_configured: "This server is not configured yet. An administrator should run `/setup`.",
  },
};

export type TranslationKey = keyof typeof translations.fr;

export function t(lang: Lang, key: TranslationKey, ...args: any[]): string {
  const val = translations[lang]?.[key] ?? translations.en[key];
  if (typeof val === "function") return (val as Function)(...args);
  return val as string;
}