<?php

namespace App\Observers;

interface ObserverInterface
{
    // every observer must implement this method
    // it gets called when the subject notifies them
    public function update(string $eventType, array $data): void;
}