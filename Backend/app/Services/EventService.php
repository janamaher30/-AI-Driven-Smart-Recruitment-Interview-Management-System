<?php

namespace App\Services;

use App\Observers\ObserverInterface;
use App\Observers\SubjectInterface;
use App\Observers\NotificationEscalator;

class EventService implements SubjectInterface
{
    // list of all attached observers
    private array $observers = [];

    // singleton instance — only one EventService exists in the system
    private static ?EventService $instance = null;

    // private constructor so no one can do "new EventService()" directly
    private function __construct()
    {
        // automatically attach the NotificationEscalator as a default observer
        $this->attach(new NotificationEscalator());
    }

    // get the single instance of EventService
    public static function getInstance(): EventService
    {
        if (self::$instance === null) {
            self::$instance = new EventService();
        }
        return self::$instance;
    }

    // attach a new observer
    public function attach(ObserverInterface $observer): void
    {
        $this->observers[] = $observer;
    }

    // remove an observer
    public function detach(ObserverInterface $observer): void
    {
        $this->observers = array_filter(
            $this->observers,
            fn($o) => $o !== $observer
        );
    }

    // notify all observers about an event
    public function notifyObservers(string $eventType, array $data): void
    {
        foreach ($this->observers as $observer) {
            $observer->update($eventType, $data);
        }
    }

    // --- these are the methods called by controllers ---

    public function fireAssessmentFlagged(array $data): void
    {
        $this->notifyObservers('ASSESSMENT_FLAGGED', $data);
    }

    public function fireFeedbackReminder(array $data): void
    {
        $this->notifyObservers('FEEDBACK_REMINDER', $data);
    }

    public function fireFeedbackEscalation(array $data): void
    {
        $this->notifyObservers('FEEDBACK_ESCALATION', $data);
    }

    public function fireExtensionRequest(array $data): void
    {
        $this->notifyObservers('SESSION_EXTENSION_REQUEST', $data);
    }

    public function fireExtensionApproved(array $data): void
    {
        $this->notifyObservers('SESSION_EXTENSION_APPROVED', $data);
    }

    public function fireExtensionRejected(array $data): void
    {
        $this->notifyObservers('SESSION_EXTENSION_REJECTED', $data);
    }

    public function fireStatusChange(array $data): void
    {
        $this->notifyObservers('STATUS_CHANGE', $data);
    }

    public function fireInterviewScheduled(array $data): void
    {
        $this->notifyObservers('INTERVIEW_SCHEDULED', $data);
    }

    public function fireRedFlag(array $data): void
    {
        $this->notifyObservers('RED_FLAG_RAISED', $data);
    }
}