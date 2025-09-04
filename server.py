#!/usr/bin/env python3
"""
Simple HTTP Server for MaddyZone Website
Run this script to test the website locally
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers for better development experience
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def start_server():
    """Start the development server"""
    print(f"""
╔══════════════════════════════════════════════════════╗
║          MaddyZone Development Server                 ║
╚══════════════════════════════════════════════════════╝

Starting server...
Server running at: http://localhost:{PORT}
Directory: {DIRECTORY}

Press Ctrl+C to stop the server
    """)
    
    # Change to the website directory
    os.chdir(DIRECTORY)
    
    # Create and start the server
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        try:
            # Try to open the browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            print(f"✅ Server started successfully!")
            print(f"🌐 Opening browser at http://localhost:{PORT}")
            print("-" * 50)
            
            # Start serving requests
            httpd.serve_forever()
            
        except KeyboardInterrupt:
            print("\n" + "-" * 50)
            print("🛑 Server stopped by user")
            httpd.shutdown()
        except Exception as e:
            print(f"❌ Error: {e}")
            httpd.shutdown()

if __name__ == "__main__":
    try:
        start_server()
    except OSError as e:
        if e.errno == 48:  # Port already in use
            print(f"❌ Port {PORT} is already in use!")
            print("Try closing other applications or use a different port")
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")