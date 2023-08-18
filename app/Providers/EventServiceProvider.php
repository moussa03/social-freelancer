<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;


use App\Events\EmailRecrutor;
use App\Listeners\SendEmailRecrutor;

use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        // messageEvent::class => [
        //    sendNotificationListener::class,
        // ],
        // 'App\Events\messageEvent' => [
        //     'App\Listeners\SendNotificationListener',
        // ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {

        Event::listen(
            EmailRecrutor::class,
            [SendEmailRecrutor::class, 'handle']
        );
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
