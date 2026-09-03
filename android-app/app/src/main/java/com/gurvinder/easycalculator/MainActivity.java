package com.gurvinder.easycalculator;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {
    private WebView calculatorView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        calculatorView = new WebView(this);
        WebSettings settings = calculatorView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        calculatorView.loadUrl("file:///android_asset/index.html");
        setContentView(calculatorView);
    }

    @Override
    public void onBackPressed() {
        if (calculatorView.canGoBack()) {
            calculatorView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
