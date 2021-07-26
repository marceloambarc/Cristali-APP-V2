import Evento from "../models/Evento";

export default {
  render(event: Evento) {
    return {
      id: event.ID_Evento,
      createdAt: event.DT_Evento,
      userCode: event.CD_ccli,
      eventDescription: event.TX_Evento,
      userToken: event.Token_Cliente,
      deviceToken: event.Token_Celular
    };
  },

  renderMany(events: Evento[]) {
    return events.map(event => this.render(event));
  }
}