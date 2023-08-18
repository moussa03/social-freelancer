<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Google_Client;
use Google_Service_Gmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class GmailController extends Controller
{
    
    public function redirectToGoogleAuth()
    {
       
        $client = $this->getClient();
       
        $authUrl = $client->createAuthUrl();

        return Redirect::to($authUrl);
    }

    public function getEmails()
    {
        // Retrieve the access token from the user session or database
        $accessToken = "og";

        $client = $this->getClient();
        $client->setAccessToken($accessToken);

        $service = new Google_Service_Gmail($client);
        $emails = $service->users_messages->listUsersMessages('me');

        // Process the fetched emails as needed

        return view('dashboard', compact('emails'));
    }
    private function getClient()
    {
        $client = new Google_Client();
        $client->setClientId(config('app.google_client_id'));
        $client->setClientSecret(config('app.google_client_secret'));
        $client->setRedirectUri(config('app.google_redirect_uri'));
        $client->setAccessType('offline');
        $client->setScopes([Google_Service_Gmail::GMAIL_READONLY]);

        return $client;
    }

}
