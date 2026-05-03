<?php

namespace App\Observers;

interface SubjectInterface
{
    // attach an observer to listen for events
    public function attach(ObserverInterface $observer): void;

    // remove an observer
    public function detach(ObserverInterface $observer): void;

    // notify all attached observers
    public function notifyObservers(string $eventType, array $data): void;
}