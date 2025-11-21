"""
Otonom Siber Operasyon Arayüzü - Midas Pro
Autonomous Cyber Operations Command Center
Python implementation using CustomTkinter
"""

import customtkinter as ctk
import tkinter as tk
from tkinter import Canvas
import math
import time
from typing import Optional, Callable
import threading

# Color scheme matching the original design
COLORS = {
    'bg_dark': '#0a0a0f',
    'bg_medium': '#0f0f14',
    'bg_light': '#121218',
    'border': '#1e1e24',
    'border_light': '#2d2d35',
    'text_primary': '#e8e8ea',
    'text_secondary': '#6b6b75',
    'gold': '#d4af37',
    'gold_light': '#ffd700',
    'gold_dark': '#b8941e',
    'cyan': '#00d4ff',
    'red': '#ff3366',
    'blue': '#4a9eff',
    'purple': '#a855f7',
    'green': '#14b8a6',
    'yellow': '#febc2e',
    'red_light': '#ff5f57',
    'green_light': '#28c840',
    'pink': '#ff4d9f',
}

class SplashScreen(ctk.CTkToplevel):
    """Splash screen displayed during application initialization"""
    
    def __init__(self, parent, on_complete: Callable):
        super().__init__(parent)
        self.on_complete = on_complete
        self.progress = 0
        
        # Configure splash window
        self.title("Midas Pro")
        self.geometry("800x600")
        self.configure(fg_color='#000000')
        
        # Remove window decorations
        self.overrideredirect(True)
        
        # Center the window
        self.update_idletasks()
        x = (self.winfo_screenwidth() // 2) - (800 // 2)
        y = (self.winfo_screenheight() // 2) - (600 // 2)
        self.geometry(f"800x600+{x}+{y}")
        
        # Create content
        self._create_widgets()
        
        # Start progress animation
        self._animate_progress()
    
    def _create_widgets(self):
        """Create splash screen widgets"""
        # Main container
        container = ctk.CTkFrame(self, fg_color='#000000')
        container.pack(fill='both', expand=True)
        
        # Logo container with gradient effect (simulated with gold color)
        logo_frame = ctk.CTkFrame(
            container, 
            width=128, 
            height=128,
            corner_radius=16,
            fg_color=COLORS['gold']
        )
        logo_frame.pack(pady=(150, 20))
        logo_frame.pack_propagate(False)
        
        # Logo text "M"
        logo_label = ctk.CTkLabel(
            logo_frame,
            text="M",
            font=("Georgia", 70, "bold"),
            text_color='#000000'
        )
        logo_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Title
        title_label = ctk.CTkLabel(
            container,
            text="Midas Pro",
            font=("Georgia", 48, "bold"),
            text_color=COLORS['gold_light']
        )
        title_label.pack(pady=10)
        
        # Subtitle
        subtitle_label = ctk.CTkLabel(
            container,
            text="AUTONOMOUS CYBER OPERATIONS COMMAND CENTER",
            font=("Arial", 10),
            text_color='#666666'
        )
        subtitle_label.pack(pady=(0, 40))
        
        # Progress bar
        self.progress_bar = ctk.CTkProgressBar(
            container,
            width=320,
            height=4,
            corner_radius=2,
            fg_color='#333333',
            progress_color=COLORS['gold']
        )
        self.progress_bar.pack(pady=10)
        self.progress_bar.set(0)
        
        # Progress text
        progress_frame = ctk.CTkFrame(container, fg_color='transparent')
        progress_frame.pack(fill='x', padx=240)
        
        self.progress_status = ctk.CTkLabel(
            progress_frame,
            text="Initializing Systems",
            font=("Arial", 9),
            text_color='#666666'
        )
        self.progress_status.pack(side='left')
        
        self.progress_percent = ctk.CTkLabel(
            progress_frame,
            text="0%",
            font=("Arial", 9),
            text_color='#666666'
        )
        self.progress_percent.pack(side='right')
    
    def _animate_progress(self):
        """Animate the progress bar"""
        if self.progress < 100:
            self.progress += 2
            self.progress_bar.set(self.progress / 100)
            self.progress_percent.configure(text=f"{self.progress}%")
            self.after(30, self._animate_progress)
        else:
            self.after(500, self._complete)
    
    def _complete(self):
        """Complete splash screen and show main app"""
        self.destroy()
        self.on_complete()


class NetworkGraph(ctk.CTkFrame):
    """Network graph visualization component"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_light'], corner_radius=8)
        
        self.canvas = Canvas(
            self,
            bg=COLORS['bg_light'],
            highlightthickness=0,
            width=980,
            height=720
        )
        self.canvas.pack(fill='both', expand=True)
        
        # Network data
        self.center_x = 490
        self.center_y = 360
        self.orbit_radius = 240
        self.time = 0
        
        self.categories = [
            {'id': 'mcp', 'label': 'MCP SERVICES', 'sublabel': '42', 'angle': -90, 'color': COLORS['pink'], 'node_count': 4},
            {'id': 'tools', 'label': 'SECURITY TOOLS', 'sublabel': '170+', 'angle': -30, 'color': COLORS['blue'], 'node_count': 5},
            {'id': 'models', 'label': 'AI MODELS', 'sublabel': '12', 'angle': 30, 'color': COLORS['cyan'], 'node_count': 4},
            {'id': 'data', 'label': 'DATASOURCES', 'sublabel': 'COMING SOON', 'angle': 90, 'color': COLORS['green'], 'node_count': 3},
            {'id': 'vulns', 'label': 'VULNERABILITIES', 'sublabel': '321', 'angle': 150, 'color': COLORS['red'], 'node_count': 5},
            {'id': 'agents', 'label': 'AGENTS', 'sublabel': '8', 'angle': 210, 'color': COLORS['purple'], 'node_count': 4},
        ]
        
        # Start animation
        self._animate()
    
    def _animate(self):
        """Animate the network graph"""
        self.canvas.delete('all')
        self.time += 0.015
        
        # Draw background grid pattern
        for y in range(0, 720, 8):
            self.canvas.create_line(0, y, 980, y, fill='#374151', width=1)
        
        # Draw connections
        for i, cat in enumerate(self.categories):
            angle_rad = math.radians(cat['angle'])
            cat_x = self.center_x + math.cos(angle_rad) * self.orbit_radius
            cat_y = self.center_y + math.sin(angle_rad) * self.orbit_radius
            
            # Draw connection to center
            self.canvas.create_line(
                self.center_x, self.center_y,
                cat_x, cat_y,
                fill=cat['color'],
                width=2,
                dash=(5, 3)
            )
            
            # Draw category node
            self.canvas.create_oval(
                cat_x - 40, cat_y - 40,
                cat_x + 40, cat_y + 40,
                fill=COLORS['bg_medium'],
                outline=cat['color'],
                width=2
            )
            
            # Draw category label
            self.canvas.create_text(
                cat_x, cat_y - 10,
                text=cat['label'],
                fill=COLORS['text_primary'],
                font=('Arial', 8, 'bold')
            )
            
            # Draw sublabel
            self.canvas.create_text(
                cat_x, cat_y + 8,
                text=cat['sublabel'],
                fill=cat['color'],
                font=('Arial', 10, 'bold')
            )
        
        # Draw center node
        self.canvas.create_oval(
            self.center_x - 60, self.center_y - 60,
            self.center_x + 60, self.center_y + 60,
            fill=COLORS['bg_medium'],
            outline=COLORS['gold'],
            width=3
        )
        
        self.canvas.create_text(
            self.center_x, self.center_y - 15,
            text="MIDAS PRO",
            fill=COLORS['gold'],
            font=('Georgia', 12, 'bold')
        )
        
        self.canvas.create_text(
            self.center_x, self.center_y + 10,
            text="AI Runtime",
            fill=COLORS['text_secondary'],
            font=('Arial', 9)
        )
        
        # Continue animation
        self.after(50, self._animate)


class CommandPanel(ctk.CTkFrame):
    """Dashboard/Command panel view"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_light'])
        
        # Create main layout
        self._create_layout()
    
    def _create_layout(self):
        """Create command panel layout"""
        # Header
        header = ctk.CTkFrame(self, fg_color='transparent', height=56)
        header.pack(fill='x', padx=0, pady=0)
        header.pack_propagate(False)
        
        header_label = ctk.CTkLabel(
            header,
            text="Welcome Back, Admin",
            font=("Arial", 12),
            text_color=COLORS['text_primary']
        )
        header_label.pack(side='left', padx=24, pady=16)
        
        # Separator
        separator = ctk.CTkFrame(self, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
        
        # Main content area
        content = ctk.CTkFrame(self, fg_color='transparent')
        content.pack(fill='both', expand=True, padx=16, pady=16)
        
        # Left side - Network graph
        left_frame = ctk.CTkFrame(content, fg_color='transparent')
        left_frame.pack(side='left', fill='both', expand=True)
        
        self.network_graph = NetworkGraph(left_frame)
        self.network_graph.pack(fill='both', expand=True)
        
        # Right sidebar
        right_sidebar = ctk.CTkFrame(content, fg_color=COLORS['bg_medium'], width=320, corner_radius=0)
        right_sidebar.pack(side='right', fill='y', padx=(16, 0))
        right_sidebar.pack_propagate(False)
        
        # Top stats in sidebar
        stats_frame = ctk.CTkFrame(right_sidebar, fg_color='transparent', height=56)
        stats_frame.pack(fill='x', pady=0)
        stats_frame.pack_propagate(False)
        
        stats_left = ctk.CTkFrame(stats_frame, fg_color='transparent')
        stats_left.pack(side='left', padx=16, pady=16)
        
        ctk.CTkLabel(
            stats_left,
            text="● Blocked: 13.9K",
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(side='left')
        
        stats_right = ctk.CTkFrame(stats_frame, fg_color='transparent')
        stats_right.pack(side='left', padx=(32, 0), pady=16)
        
        ctk.CTkLabel(
            stats_right,
            text="● Alerts: 6",
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(side='left')
        
        # Separator
        sep1 = ctk.CTkFrame(right_sidebar, fg_color=COLORS['border'], height=1)
        sep1.pack(fill='x')
        
        # Threats overview
        threats_frame = ctk.CTkFrame(right_sidebar, fg_color='transparent')
        threats_frame.pack(fill='x', padx=16, pady=16)
        
        ctk.CTkLabel(
            threats_frame,
            text="THREATS OVERVIEW",
            font=("Arial", 9, "bold"),
            text_color=COLORS['text_secondary']
        ).pack(anchor='w')
        
        # Threat bars
        bars_frame = ctk.CTkFrame(threats_frame, fg_color='transparent', height=100)
        bars_frame.pack(fill='x', pady=(12, 0))
        
        # Simplified bar chart
        blocked_bar = ctk.CTkProgressBar(
            bars_frame,
            width=100,
            height=80,
            corner_radius=4,
            fg_color=COLORS['bg_dark'],
            progress_color=COLORS['cyan'],
            orientation='vertical'
        )
        blocked_bar.pack(side='left', padx=(0, 8))
        blocked_bar.set(0.85)
        
        alert_bar = ctk.CTkProgressBar(
            bars_frame,
            width=100,
            height=80,
            corner_radius=4,
            fg_color=COLORS['bg_dark'],
            progress_color=COLORS['red'],
            orientation='vertical'
        )
        alert_bar.pack(side='left')
        alert_bar.set(0.1)
        
        # Legend
        legend_frame = ctk.CTkFrame(threats_frame, fg_color='transparent')
        legend_frame.pack(fill='x', pady=(12, 0))
        
        blocked_legend = ctk.CTkFrame(legend_frame, fg_color='transparent')
        blocked_legend.pack(fill='x', pady=4)
        
        ctk.CTkLabel(
            blocked_legend,
            text="■ Blocked",
            font=("Arial", 9),
            text_color=COLORS['text_primary']
        ).pack(side='left')
        
        ctk.CTkLabel(
            blocked_legend,
            text="13.9K",
            font=("Arial", 10, "bold"),
            text_color=COLORS['text_primary']
        ).pack(side='right')
        
        alert_legend = ctk.CTkFrame(legend_frame, fg_color='transparent')
        alert_legend.pack(fill='x', pady=4)
        
        ctk.CTkLabel(
            alert_legend,
            text="■ Alerts",
            font=("Arial", 9),
            text_color=COLORS['text_primary']
        ).pack(side='left')
        
        ctk.CTkLabel(
            alert_legend,
            text="6",
            font=("Arial", 10, "bold"),
            text_color=COLORS['text_primary']
        ).pack(side='right')
        
        # Separator
        sep2 = ctk.CTkFrame(right_sidebar, fg_color=COLORS['border'], height=1)
        sep2.pack(fill='x')
        
        # Recent activity
        activity_frame = ctk.CTkScrollableFrame(
            right_sidebar,
            fg_color='transparent',
            label_text="RECENT ACTIVITY",
            label_font=("Arial", 9, "bold"),
            label_text_color=COLORS['text_secondary']
        )
        activity_frame.pack(fill='both', expand=True, padx=16, pady=16)
        
        # Activity items
        activities = [
            {'time': '14:32', 'event': 'Metasploit RPC initialized', 'type': 'success'},
            {'time': '14:31', 'event': 'Burp Suite scan completed', 'type': 'success'},
            {'time': '14:29', 'event': 'Critical vulnerability detected', 'type': 'alert'},
            {'time': '14:27', 'event': 'Nmap scan started on 192.168.1.0/24', 'type': 'info'},
            {'time': '14:25', 'event': 'AI agent workflow approved', 'type': 'success'},
            {'time': '14:23', 'event': 'Docker container deployed', 'type': 'info'},
            {'time': '14:21', 'event': 'SQLMap injection detected', 'type': 'alert'},
            {'time': '14:19', 'event': 'Gemini AI analysis complete', 'type': 'success'},
        ]
        
        for activity in activities:
            item_frame = ctk.CTkFrame(
                activity_frame,
                fg_color=COLORS['bg_dark'],
                corner_radius=4,
                border_width=1,
                border_color=COLORS['border_light']
            )
            item_frame.pack(fill='x', pady=4)
            
            time_label = ctk.CTkLabel(
                item_frame,
                text=activity['time'],
                font=("Arial", 8),
                text_color=COLORS['text_secondary']
            )
            time_label.pack(side='left', padx=8, pady=8)
            
            event_label = ctk.CTkLabel(
                item_frame,
                text=activity['event'],
                font=("Arial", 8),
                text_color=COLORS['text_primary'],
                wraplength=200,
                anchor='w'
            )
            event_label.pack(side='left', padx=(0, 8), pady=8, fill='x', expand=True)
            
            # Status indicator
            status_color = COLORS['green'] if activity['type'] == 'success' else (
                COLORS['red'] if activity['type'] == 'alert' else COLORS['text_secondary']
            )
            status = ctk.CTkLabel(
                item_frame,
                text="●",
                font=("Arial", 8),
                text_color=status_color
            )
            status.pack(side='right', padx=8, pady=8)
        
        # Separator
        sep3 = ctk.CTkFrame(right_sidebar, fg_color=COLORS['border'], height=1)
        sep3.pack(fill='x')
        
        # Severity breakdown
        severity_frame = ctk.CTkFrame(right_sidebar, fg_color='transparent')
        severity_frame.pack(fill='x', padx=16, pady=16)
        
        ctk.CTkLabel(
            severity_frame,
            text="SEVERITY",
            font=("Arial", 9, "bold"),
            text_color=COLORS['text_secondary']
        ).pack(anchor='w')
        
        # Severity bar
        sev_bar_frame = ctk.CTkFrame(severity_frame, fg_color=COLORS['bg_dark'], height=8, corner_radius=4)
        sev_bar_frame.pack(fill='x', pady=(12, 12))
        sev_bar_frame.pack_propagate(False)
        
        # Severity items
        severities = [
            {'label': 'Critical', 'color': COLORS['red'], 'count': '3'},
            {'label': 'Medium', 'color': COLORS['gold'], 'count': '13.6K'},
            {'label': 'Low', 'color': COLORS['blue'], 'count': '249'},
        ]
        
        for sev in severities:
            sev_item = ctk.CTkFrame(severity_frame, fg_color='transparent')
            sev_item.pack(fill='x', pady=4)
            
            sev_label_frame = ctk.CTkFrame(sev_item, fg_color='transparent')
            sev_label_frame.pack(side='left')
            
            ctk.CTkLabel(
                sev_label_frame,
                text="■",
                font=("Arial", 10),
                text_color=sev['color']
            ).pack(side='left', padx=(0, 4))
            
            ctk.CTkLabel(
                sev_label_frame,
                text=sev['label'],
                font=("Arial", 9),
                text_color=COLORS['text_primary']
            ).pack(side='left')
            
            ctk.CTkLabel(
                sev_item,
                text=sev['count'],
                font=("Arial", 9),
                text_color=COLORS['text_primary']
            ).pack(side='right')


class OrchestrationWorkflow(ctk.CTkFrame):
    """Workflow orchestration view"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_light'])
        
        # Header
        header = ctk.CTkFrame(self, fg_color='transparent', height=56)
        header.pack(fill='x', padx=0, pady=0)
        header.pack_propagate(False)
        
        header_label = ctk.CTkLabel(
            header,
            text="Workflow Orchestration",
            font=("Arial", 12),
            text_color=COLORS['text_primary']
        )
        header_label.pack(side='left', padx=24, pady=16)
        
        # Separator
        separator = ctk.CTkFrame(self, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
        
        # Content - Coming soon message
        content = ctk.CTkFrame(self, fg_color='transparent')
        content.pack(fill='both', expand=True)
        
        # Center container
        center = ctk.CTkFrame(content, fg_color='transparent')
        center.place(relx=0.5, rely=0.5, anchor='center')
        
        # Icon
        icon_frame = ctk.CTkFrame(
            center,
            width=64,
            height=64,
            corner_radius=32,
            fg_color=COLORS['border']
        )
        icon_frame.pack()
        icon_frame.pack_propagate(False)
        
        icon_label = ctk.CTkLabel(
            icon_frame,
            text="⚡",
            font=("Arial", 32),
            text_color=COLORS['gold']
        )
        icon_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Message
        message = ctk.CTkLabel(
            center,
            text="Workflow builder coming soon",
            font=("Arial", 11),
            text_color=COLORS['text_secondary']
        )
        message.pack(pady=(16, 0))


class ExpertIntelligence(ctk.CTkFrame):
    """Expert intelligence view"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_light'])
        
        # Header
        header = ctk.CTkFrame(self, fg_color='transparent', height=56)
        header.pack(fill='x', padx=0, pady=0)
        header.pack_propagate(False)
        
        header_label = ctk.CTkLabel(
            header,
            text="Pen-İş Intelligence",
            font=("Arial", 12),
            text_color=COLORS['text_primary']
        )
        header_label.pack(side='left', padx=24, pady=16)
        
        # Separator
        separator = ctk.CTkFrame(self, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
        
        # Content - Coming soon message
        content = ctk.CTkFrame(self, fg_color='transparent')
        content.pack(fill='both', expand=True)
        
        # Center container
        center = ctk.CTkFrame(content, fg_color='transparent')
        center.place(relx=0.5, rely=0.5, anchor='center')
        
        # Icon
        icon_frame = ctk.CTkFrame(
            center,
            width=64,
            height=64,
            corner_radius=32,
            fg_color=COLORS['border']
        )
        icon_frame.pack()
        icon_frame.pack_propagate(False)
        
        icon_label = ctk.CTkLabel(
            icon_frame,
            text="🧠",
            font=("Arial", 32),
            text_color=COLORS['gold']
        )
        icon_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Message
        message = ctk.CTkLabel(
            center,
            text="Intelligence dashboard coming soon",
            font=("Arial", 11),
            text_color=COLORS['text_secondary']
        )
        message.pack(pady=(16, 0))


class MidasProApp(ctk.CTk):
    """Main application window"""
    
    def __init__(self):
        super().__init__()
        
        # Configure window
        self.title("Midas Pro - Autonomous Cyber Operations")
        self.geometry("1400x850")
        self.configure(fg_color=COLORS['bg_dark'])
        
        # Center window
        self.update_idletasks()
        x = (self.winfo_screenwidth() // 2) - (1400 // 2)
        y = (self.winfo_screenheight() // 2) - (850 // 2)
        self.geometry(f"1400x850+{x}+{y}")
        
        # Remove default title bar (optional)
        # self.overrideredirect(True)
        
        self.active_tab = 'command'
        
        # Show splash screen first
        self.withdraw()  # Hide main window
        self.splash = SplashScreen(self, self._on_splash_complete)
    
    def _on_splash_complete(self):
        """Called when splash screen completes"""
        self.deiconify()  # Show main window
        self._create_main_window()
    
    def _create_main_window(self):
        """Create main application window"""
        # Main container (simulating rounded window)
        main_container = ctk.CTkFrame(
            self,
            fg_color=COLORS['bg_medium'],
            corner_radius=20,
            border_width=1,
            border_color=COLORS['border']
        )
        main_container.pack(fill='both', expand=True, padx=32, pady=32)
        
        # Title bar
        self._create_title_bar(main_container)
        
        # Content area
        content = ctk.CTkFrame(main_container, fg_color='transparent')
        content.pack(fill='both', expand=True)
        
        # Sidebar
        self._create_sidebar(content)
        
        # Main content area
        self.content_frame = ctk.CTkFrame(content, fg_color=COLORS['bg_light'])
        self.content_frame.pack(side='right', fill='both', expand=True)
        
        # Show default view
        self._switch_tab('command')
    
    def _create_title_bar(self, parent):
        """Create custom title bar"""
        title_bar = ctk.CTkFrame(
            parent,
            fg_color=COLORS['bg_dark'],
            height=44,
            corner_radius=0
        )
        title_bar.pack(fill='x')
        title_bar.pack_propagate(False)
        
        # Left side - window controls and title
        left_frame = ctk.CTkFrame(title_bar, fg_color='transparent')
        left_frame.pack(side='left', padx=16, pady=0, fill='y')
        
        # Window control dots (macOS style)
        controls = ctk.CTkFrame(left_frame, fg_color='transparent')
        controls.pack(side='left')
        
        for color in [COLORS['red_light'], COLORS['yellow'], COLORS['green_light']]:
            dot = ctk.CTkFrame(controls, width=12, height=12, corner_radius=6, fg_color=color)
            dot.pack(side='left', padx=2)
        
        # Title
        title_label = ctk.CTkLabel(
            left_frame,
            text="MIDAS PRO",
            font=("Arial", 9, "bold"),
            text_color=COLORS['text_primary']
        )
        title_label.pack(side='left', padx=(12, 0))
        
        network_label = ctk.CTkLabel(
            left_frame,
            text="Network",
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        )
        network_label.pack(side='left', padx=8)
        
        # Right side - status options
        right_frame = ctk.CTkFrame(title_bar, fg_color='transparent')
        right_frame.pack(side='right', padx=16, pady=0)
        
        operational_btn = ctk.CTkButton(
            right_frame,
            text="Operational",
            font=("Arial", 9),
            text_color=COLORS['text_secondary'],
            fg_color='transparent',
            hover_color=COLORS['border'],
            width=80,
            height=24
        )
        operational_btn.pack(side='left', padx=4)
        
        security_btn = ctk.CTkButton(
            right_frame,
            text="Security",
            font=("Arial", 9),
            text_color=COLORS['text_secondary'],
            fg_color='transparent',
            hover_color=COLORS['border'],
            width=80,
            height=24
        )
        security_btn.pack(side='left', padx=4)
        
        time_label = ctk.CTkLabel(
            right_frame,
            text="Past 24 Hours",
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        )
        time_label.pack(side='left', padx=8)
        
        # Separator
        separator = ctk.CTkFrame(parent, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
    
    def _create_sidebar(self, parent):
        """Create navigation sidebar"""
        sidebar = ctk.CTkFrame(
            parent,
            fg_color=COLORS['bg_dark'],
            width=56,
            corner_radius=0
        )
        sidebar.pack(side='left', fill='y')
        sidebar.pack_propagate(False)
        
        # Logo
        logo_frame = ctk.CTkFrame(
            sidebar,
            width=36,
            height=36,
            corner_radius=8,
            fg_color=COLORS['gold']
        )
        logo_frame.pack(pady=(16, 16))
        
        logo_label = ctk.CTkLabel(
            logo_frame,
            text="M",
            font=("Georgia", 20, "bold"),
            text_color='#000000'
        )
        logo_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Menu items
        menu_items = [
            {'id': 'command', 'icon': '🛡️', 'label': 'Dashboard'},
            {'id': 'orchestration', 'icon': '⚙️', 'label': 'Workflow'},
            {'id': 'intelligence', 'icon': '🧠', 'label': 'Intelligence'},
        ]
        
        for item in menu_items:
            btn = ctk.CTkButton(
                sidebar,
                text=item['icon'],
                font=("Arial", 18),
                width=36,
                height=36,
                corner_radius=8,
                fg_color=COLORS['border'] if self.active_tab == item['id'] else 'transparent',
                text_color=COLORS['gold'] if self.active_tab == item['id'] else COLORS['text_secondary'],
                hover_color=COLORS['border'],
                command=lambda tab=item['id']: self._switch_tab(tab)
            )
            btn.pack(pady=6)
        
        # Spacer
        spacer = ctk.CTkFrame(sidebar, fg_color='transparent')
        spacer.pack(fill='both', expand=True)
        
        # Bottom items
        bottom_items = ['👥', '⚙️', '🔔']
        for icon in bottom_items:
            btn = ctk.CTkButton(
                sidebar,
                text=icon,
                font=("Arial", 16),
                width=36,
                height=36,
                corner_radius=8,
                fg_color='transparent',
                text_color=COLORS['text_secondary'],
                hover_color=COLORS['border']
            )
            btn.pack(pady=6)
    
    def _switch_tab(self, tab_id: str):
        """Switch between different tabs"""
        self.active_tab = tab_id
        
        # Clear current content
        for widget in self.content_frame.winfo_children():
            widget.destroy()
        
        # Show appropriate view
        if tab_id == 'command':
            view = CommandPanel(self.content_frame)
        elif tab_id == 'orchestration':
            view = OrchestrationWorkflow(self.content_frame)
        elif tab_id == 'intelligence':
            view = ExpertIntelligence(self.content_frame)
        else:
            return
        
        view.pack(fill='both', expand=True)


def main():
    """Main entry point"""
    # Set appearance mode and color theme
    ctk.set_appearance_mode("dark")
    ctk.set_default_color_theme("blue")
    
    # Create and run app
    app = MidasProApp()
    app.mainloop()


if __name__ == "__main__":
    main()
