#!/usr/bin/env python3
"""
Midas Pro - Autonomous Cyber Operations Command Center
Quick start script
"""

import sys
import os

def check_requirements():
    """Check if all requirements are installed"""
    try:
        import customtkinter
        print("✓ customtkinter is installed")
    except ImportError:
        print("✗ customtkinter is not installed")
        print("\nPlease install requirements:")
        print("  pip install -r requirements.txt")
        return False
    
    try:
        import tkinter
        print("✓ tkinter is available")
    except ImportError:
        print("✗ tkinter is not installed")
        print("\nPlease install tkinter:")
        print("  Ubuntu/Debian: sudo apt-get install python3-tk")
        print("  Fedora: sudo dnf install python3-tkinter")
        print("  macOS: tkinter is included with Python")
        print("  Windows: tkinter is included with Python")
        return False
    
    return True

def main():
    """Main entry point"""
    print("=" * 60)
    print("Midas Pro - Autonomous Cyber Operations Command Center")
    print("=" * 60)
    print()
    
    if not check_requirements():
        sys.exit(1)
    
    print()
    print("✓ All requirements satisfied")
    print()
    print("Starting application...")
    print()
    
    # Import and run the app
    from app import main as app_main
    app_main()

if __name__ == "__main__":
    main()
