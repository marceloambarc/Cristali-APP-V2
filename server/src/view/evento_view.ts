import Evento from "../models/Evento";

export default {
  render(event: Evento) {
    return {
      id: event.id_evento,
      createdAt: event.dt_evento,
      userCode: event.cd_ccli,
      eventDescription: event.tx_evento,
      userToken: event.token_cliente,
      deviceToken: event.token_celular,
      updated: event.in_acerto
    };
  },

  renderMany(events: Evento[]) {
    return events.map(event => this.render(event));
  }
}