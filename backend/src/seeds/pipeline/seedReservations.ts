import { PoolClient } from "pg";

export const demoReservations = [
  {
    userIndex: 0,
    menu_name: "Grande Table Forestière",
    persons: 80,
    status: "completed",
    event_date: "2025-09-12",
  },
  {
    userIndex: 1,
    menu_name: "Prestige Classique Revisité",
    persons: 18,
    status: "completed",
    event_date: "2025-09-18",
  },
  {
    userIndex: 2,
    menu_name: "Noir & Or Gastronomique",
    persons: 24,
    status: "completed",
    event_date: "2025-09-25",
  },
  {
    userIndex: 3,
    menu_name: "Grande Table Forestière",
    persons: 14,
    status: "completed",
    event_date: "2025-10-02",
  },
  {
    userIndex: 4,
    menu_name: "Harmonie Verte Contemporaine",
    persons: 12,
    status: "completed",
    event_date: "2025-10-06",
  },
  {
    userIndex: 5,
    menu_name: "Collection Prestige Classique",
    persons: 30,
    status: "completed",
    event_date: "2025-10-10",
  },
  {
    userIndex: 6,
    menu_name: "Grande Table Forestière",
    persons: 20,
    status: "completed",
    event_date: "2025-10-15",
  },
  {
    userIndex: 7,
    menu_name: "Prestige Classique Revisité",
    persons: 16,
    status: "completed",
    event_date: "2025-10-20",
  },
  {
    userIndex: 8,
    menu_name: "Noir & Or Gastronomique",
    persons: 22,
    status: "completed",
    event_date: "2025-10-28",
  },
  {
    userIndex: 9,
    menu_name: "Grande Table Forestière",
    persons: 10,
    status: "completed",
    event_date: "2025-11-03",
  },

  {
    userIndex: 1,
    menu_name: "Prestige Classique Revisité",
    persons: 12,
    status: "confirmed",
    event_date: "2025-11-10",
  },
  {
    userIndex: 2,
    menu_name: "Collection Prestige Classique",
    persons: 18,
    status: "confirmed",
    event_date: "2025-11-15",
  },
  {
    userIndex: 3,
    menu_name: "Grande Table Forestière",
    persons: 14,
    status: "confirmed",
    event_date: "2025-11-18",
  },
  {
    userIndex: 4,
    menu_name: "Noir & Or Gastronomique",
    persons: 20,
    status: "confirmed",
    event_date: "2025-11-22",
  },

  {
    userIndex: 5,
    menu_name: "Grande Table Forestière",
    persons: 16,
    status: "pending",
    event_date: "2025-11-25",
  },
  {
    userIndex: 6,
    menu_name: "Prestige Classique Revisité",
    persons: 12,
    status: "pending",
    event_date: "2025-11-28",
  },

  {
    userIndex: 7,
    menu_name: "Collection Prestige Classique",
    persons: 20,
    status: "cancelled",
    event_date: "2025-09-30",
  },
  {
    userIndex: 8,
    menu_name: "Grande Table Forestière",
    persons: 25,
    status: "cancelled",
    event_date: "2025-10-12",
  },

  {
    userIndex: 0,
    menu_name: "Noir & Or Gastronomique",
    persons: 60,
    status: "completed",
    event_date: "2025-11-05",
  },
  {
    userIndex: 0,
    menu_name: "Prestige Classique Revisité",
    persons: 40,
    status: "completed",
    event_date: "2025-10-25",
  },
];

export function equipmentFlags(status: string) {
  if (status === "completed") return { loaned: true, returned: true };
  if (status === "confirmed") return { loaned: true, returned: false };
  return { loaned: false, returned: false };
}

export function calculateTotal(persons: number) {
  return persons * 170;
}

export const seedReservations = async (client: PoolClient) => {
  let inserted = 0;
  for (const r of demoReservations) {
    const flags = equipmentFlags(r.status);
    inserted++;
    const eventDate = new Date(r.event_date);
    const dateResMade = new Date(eventDate);
    dateResMade.setDate(eventDate.getDate() - 20);

    const total = calculateTotal(r.persons);

    await client.query(
      `
      INSERT INTO reservations (
        user_id,
        no_persons,
        event_adress,
        event_name,
        date_res_made,
        event_date,
        res_status,
        client_preferences,
        equipement_loaned,
        equipement_returned,
        total_price
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `,
      [
        r.userIndex + 1,
        r.persons,
        "15 Rue Démo, Paris",
        r.menu_name,
        dateResMade,
        eventDate,
        r.status,
        null,
        flags.loaned,
        flags.returned,
        total,
      ],
    );
  }

  return inserted;
};
