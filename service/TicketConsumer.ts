import TicketNotificationService from "./TicketNotificationService";


class TicketConsumerService {
    private consumerReceiver: TicketNotificationService;

    constructor() {
        this.consumerReceiver = new TicketNotificationService();
    }

    initializeConsumers() {
        this.consumerReceiver.closedNotification();
        this.consumerReceiver.ticketCloseWarning();
    }
}

export default TicketConsumerService;
