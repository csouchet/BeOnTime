/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */
package org.apache.cordova;

import java.util.List;

/**
 * This class represents a service entry object.
 */
public class PluginEntry {

    /**
     * The name of the service that this plugin implements
     */
    public String service;

    /**
     * The plugin class name that implements the service.
     */
    public String pluginClass;

    /**
     * The pre-instantiated plugin to use for this entry.
     */
    public CordovaPlugin plugin;

    /**
     * Flag that indicates the plugin object should be created when PluginManager is initialized.
     */
    public boolean onload;

    private List<String> urlFilters;


    /**
     * Constructs with a CordovaPlugin already instantiated.
     */
    public PluginEntry(String service, CordovaPlugin plugin) {
        this(service, plugin.getClass().getName(), true, plugin, null);
    }

    /**
     * @param service     The name of the service
     * @param pluginClass The plugin class name
     * @param onload      Create plugin object when HTML page is loaded
     */
    public PluginEntry(String service, String pluginClass, boolean onload) {
        this(service, pluginClass, onload, null, null);
    }

    @Deprecated // urlFilters are going away
    public PluginEntry(String service, String pluginClass, boolean onload, List<String> urlFilters) {
        this.service = service;
        this.pluginClass = pluginClass;
        this.onload = onload;
        this.urlFilters = urlFilters;
        plugin = null;
    }

    private PluginEntry(String service, String pluginClass, boolean onload, CordovaPlugin plugin, List<String> urlFilters) {
        this.service = service;
        this.pluginClass = pluginClass;
        this.onload = onload;
        this.urlFilters = urlFilters;
        this.plugin = plugin;
    }

    public List<String> getUrlFilters() {
        return urlFilters;
    }
}
