import { GraphQLError } from "graphql";
import { FlightModel } from "../db/flight.ts"; // Asegúrate de que la ruta sea correcta

export const Query = {
  // getFlights: ahora se llamará getFlights para que sea más claro
  getFlights: async (_: unknown, args: { origen?: string; destino?: string }) => {
    try {
      // Si se proporcionan ambos argumentos (origen y destino)
      if (args.origen && args.destino) {
        return await FlightModel.find({
          origen: args.origen,
          destino: args.destino,
        });
      }

      // Si solo se proporciona el origen
      if (args.origen) {
        return await FlightModel.find({ origen: args.origen });
      }

      // Si solo se proporciona el destino
      if (args.destino) {
        return await FlightModel.find({ destino: args.destino });
      }

      // Si no se proporciona ningún argumento, se devuelven todos los vuelos
      return await FlightModel.find();
    } catch (err) {
      console.log(err);
      // Personalización del error con un mensaje más claro
      throw new GraphQLError("Error retrieving flights: " + err.message);
    }
  },

  // getFlight: ahora se llamará getFlight para que sea más claro
  getFlight: async (_: unknown, args: { id: string }) => {
    try {
      // Buscando el vuelo por su ID
      const flight = await FlightModel.findById(args.id);
      
      // Si el vuelo no se encuentra, devolvemos null explícitamente
      if (!flight) {
        return null;
      }

      return flight;
    } catch (err) {
      console.log(err);
      // Personalización del error con un mensaje más claro
      throw new GraphQLError("Error retrieving flight by ID: " + err.message);
    }
  },
};
