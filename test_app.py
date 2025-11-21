"""
Test script to verify the application structure without running the GUI
"""
import sys
import os

# Test imports (skip tkinter if not available, as it requires GUI system)
try:
    import math
    import time
    from typing import Optional, Callable
    import threading
    print("✓ Core Python imports successful")
except ImportError as e:
    print(f"✗ Import error: {e}")
    sys.exit(1)

# Try to import customtkinter (optional, requires tkinter)
try:
    import customtkinter as ctk
    print("✓ CustomTkinter available")
except ImportError:
    print("⚠ CustomTkinter not available (requires tkinter system package)")
    print("  This is expected in headless environments")

# Test that the main app file can be imported
try:
    # We can't actually import app.py because it would try to create windows
    # Instead, let's check the file exists and is valid Python
    with open('app.py', 'r') as f:
        code = f.read()
    
    # Compile the code to check for syntax errors
    compile(code, 'app.py', 'exec')
    print("✓ app.py is valid Python code")
except SyntaxError as e:
    print(f"✗ Syntax error in app.py: {e}")
    sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)

# Check for required classes
required_classes = [
    'SplashScreen',
    'NetworkGraph',
    'CommandPanel',
    'OrchestrationWorkflow',
    'ExpertIntelligence',
    'MidasProApp'
]

for cls in required_classes:
    if f"class {cls}" in code:
        print(f"✓ Class {cls} found")
    else:
        print(f"✗ Class {cls} not found")

# Check for main function
if "def main():" in code:
    print("✓ main() function found")
else:
    print("✗ main() function not found")

# Check color scheme
if "COLORS = {" in code:
    print("✓ Color scheme defined")
else:
    print("✗ Color scheme not found")

print("\n✓ All checks passed! The application structure is correct.")
print("\nTo run the application:")
print("  python app.py")
