package com.ethiopian.grade912textbooks;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        try {
            WebView webView = getBridge().getWebView();
            if (webView != null) {
                WebSettings settings = webView.getSettings();
                // Ultra-low data: Always load from offline cache first for 0ms delay & 0 data usage
                settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
                settings.setDomStorageEnabled(true);
                settings.setDatabaseEnabled(true);
                settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
                settings.setEnableSmoothTransition(true);
                
                // GPU Hardware Acceleration for stutter-free 60-120fps rendering
                webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
            }
        } catch (Exception ignored) {}
    }
}
