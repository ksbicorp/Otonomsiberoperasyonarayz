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
    """Workflow orchestration view - MIDAS Workflow Editor"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_dark'])
        
        # Header with toolbar
        header = ctk.CTkFrame(self, fg_color=COLORS['bg_medium'], height=56)
        header.pack(fill='x', padx=0, pady=0)
        header.pack_propagate(False)
        
        # Left side - title
        header_label = ctk.CTkLabel(
            header,
            text="MIDAS Workflow Editor | Project: Customer Feedback Analysis",
            font=("Arial", 11),
            text_color=COLORS['text_primary']
        )
        header_label.pack(side='left', padx=16, pady=16)
        
        # Right side - buttons
        button_frame = ctk.CTkFrame(header, fg_color='transparent')
        button_frame.pack(side='right', padx=16)
        
        ctk.CTkButton(
            button_frame,
            text="💾 Save",
            width=80,
            height=28,
            fg_color='transparent',
            border_width=1,
            border_color=COLORS['border'],
            text_color=COLORS['text_secondary'],
            font=("Arial", 10),
            hover_color=COLORS['border']
        ).pack(side='left', padx=2)
        
        ctk.CTkButton(
            button_frame,
            text="▶ Deploy",
            width=80,
            height=28,
            fg_color=COLORS['blue'],
            text_color='white',
            font=("Arial", 10),
            hover_color=COLORS['blue']
        ).pack(side='left', padx=2)
        
        # Separator
        separator = ctk.CTkFrame(self, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
        
        # Main content area
        content = ctk.CTkFrame(self, fg_color='transparent')
        content.pack(fill='both', expand=True)
        
        # Left sidebar - Components panel
        left_panel = ctk.CTkScrollableFrame(
            content,
            width=250,
            fg_color=COLORS['bg_medium'],
            label_text="MIDAS Components",
            label_font=("Arial", 11, "bold"),
            label_text_color=COLORS['text_primary']
        )
        left_panel.pack(side='left', fill='y', padx=0, pady=0)
        
        # Add component categories
        self._add_component_category(left_panel, "Data Sources", ["📤 API", "🔄 Kafka", "🗄️ PostgreSQL"])
        self._add_component_category(left_panel, "Processors", ["🔤 NLP", "📝 NLP", "⚙️ NLP", "💻 NLP"])
        self._add_component_category(left_panel, "Models", ["🌲 Random Forest", "🌳 Random Forest"])
        self._add_component_category(left_panel, "Actions", ["🔔 Notification", "📧 Output"])
        self._add_component_category(left_panel, "Outputs", ["✉️ Notification", "📡 Remote"])
        
        # Center - Canvas area
        center_panel = ctk.CTkFrame(content, fg_color=COLORS['bg_dark'])
        center_panel.pack(side='left', fill='both', expand=True)
        
        # Drag and drop hint
        hint_label = ctk.CTkLabel(
            center_panel,
            text="👻\n\nDrag and Drop\n\nDrag components from the left panel to build your workflow",
            font=("Arial", 14),
            text_color=COLORS['text_secondary'],
            justify='center'
        )
        hint_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Right sidebar - Properties panel
        right_panel = ctk.CTkScrollableFrame(
            content,
            width=280,
            fg_color=COLORS['bg_medium'],
            label_text="Node Properties",
            label_font=("Arial", 11, "bold"),
            label_text_color=COLORS['text_primary']
        )
        right_panel.pack(side='right', fill='y', padx=0, pady=0)
        
        # Add property fields
        self._add_property_field(right_panel, "Model Version", "v2.1")
        self._add_property_field(right_panel, "Threshold", "0.75")
        self._add_property_field(right_panel, "Language", "English")
        
        # Workflow status section
        status_frame = ctk.CTkFrame(right_panel, fg_color='transparent')
        status_frame.pack(fill='x', pady=16)
        
        ctk.CTkLabel(
            status_frame,
            text="Workflow Status",
            font=("Arial", 10, "bold"),
            text_color=COLORS['text_primary']
        ).pack(anchor='w')
        
        # Status details
        status_details = ctk.CTkFrame(status_frame, fg_color='transparent')
        status_details.pack(fill='x', pady=8)
        
        self._add_status_row(status_details, "Last Run", "12 mins ago")
        self._add_status_row(status_details, "Status", "✓ Success", COLORS['green'])
    
    def _add_component_category(self, parent, title, components):
        """Add a collapsible component category"""
        category_frame = ctk.CTkFrame(parent, fg_color='transparent')
        category_frame.pack(fill='x', pady=8)
        
        ctk.CTkLabel(
            category_frame,
            text=f"▼ {title}",
            font=("Arial", 9, "bold"),
            text_color=COLORS['text_primary']
        ).pack(anchor='w', pady=4)
        
        # Component grid
        comp_frame = ctk.CTkFrame(category_frame, fg_color='transparent')
        comp_frame.pack(fill='x')
        
        for i, comp in enumerate(components):
            btn = ctk.CTkButton(
                comp_frame,
                text=comp,
                width=70,
                height=50,
                fg_color=COLORS['bg_dark'],
                border_width=1,
                border_color=COLORS['border_light'],
                text_color=COLORS['text_primary'],
                font=("Arial", 8),
                hover_color=COLORS['border']
            )
            btn.grid(row=i//3, column=i%3, padx=2, pady=2)
    
    def _add_property_field(self, parent, label, value):
        """Add a property field"""
        field_frame = ctk.CTkFrame(parent, fg_color='transparent')
        field_frame.pack(fill='x', pady=4)
        
        ctk.CTkLabel(
            field_frame,
            text=label,
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(anchor='w')
        
        ctk.CTkEntry(
            field_frame,
            fg_color=COLORS['bg_dark'],
            border_color=COLORS['border_light'],
            text_color=COLORS['text_primary'],
            font=("Arial", 9)
        ).pack(fill='x', pady=2)
    
    def _add_status_row(self, parent, label, value, color=None):
        """Add a status row"""
        row = ctk.CTkFrame(parent, fg_color='transparent')
        row.pack(fill='x', pady=2)
        
        ctk.CTkLabel(
            row,
            text=label,
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(side='left')
        
        ctk.CTkLabel(
            row,
            text=value,
            font=("Arial", 9),
            text_color=color if color else COLORS['text_primary']
        ).pack(side='right')


class ExpertIntelligence(ctk.CTkFrame):
    """Expert intelligence view - Reports & Findings Dashboard"""
    
    def __init__(self, parent):
        super().__init__(parent, fg_color=COLORS['bg_dark'])
        
        # Main container with sidebar
        main_container = ctk.CTkFrame(self, fg_color='transparent')
        main_container.pack(fill='both', expand=True)
        
        # Left content area
        left_content = ctk.CTkFrame(main_container, fg_color='transparent')
        left_content.pack(side='left', fill='both', expand=True)
        
        # Header
        header = ctk.CTkFrame(left_content, fg_color='transparent', height=56)
        header.pack(fill='x', padx=0, pady=0)
        header.pack_propagate(False)
        
        header_label = ctk.CTkLabel(
            header,
            text="Amidas Framework - Reports & Findings",
            font=("Arial", 12),
            text_color=COLORS['text_primary']
        )
        header_label.pack(side='left', padx=24, pady=16)
        
        # Separator
        separator = ctk.CTkFrame(left_content, fg_color=COLORS['border'], height=1)
        separator.pack(fill='x')
        
        # Content with scroll
        content = ctk.CTkScrollableFrame(left_content, fg_color='transparent')
        content.pack(fill='both', expand=True, padx=16, pady=16)
        
        # Findings Trend Chart
        chart_frame = ctk.CTkFrame(
            content,
            fg_color=COLORS['bg_medium'],
            corner_radius=8,
            border_width=1,
            border_color=COLORS['border']
        )
        chart_frame.pack(fill='x', pady=(0, 16))
        
        chart_header = ctk.CTkFrame(chart_frame, fg_color='transparent')
        chart_header.pack(fill='x', padx=16, pady=16)
        
        ctk.CTkLabel(
            chart_header,
            text="Findings Trend (Last 24 Hours)",
            font=("Arial", 11, "bold"),
            text_color=COLORS['text_primary']
        ).pack(side='left')
        
        ctk.CTkLabel(
            chart_header,
            text="📅 Past 24 Hours",
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(side='right')
        
        # Simple chart representation
        chart_canvas = ctk.CTkFrame(
            chart_frame,
            fg_color=COLORS['bg_dark'],
            height=120
        )
        chart_canvas.pack(fill='x', padx=16, pady=(0, 16))
        
        ctk.CTkLabel(
            chart_canvas,
            text="📊 Findings Trend Chart\n(Visualization showing threat activity over 24 hours)",
            font=("Arial", 10),
            text_color=COLORS['text_secondary']
        ).place(relx=0.5, rely=0.5, anchor='center')
        
        # Recent Findings Table
        table_frame = ctk.CTkFrame(
            content,
            fg_color=COLORS['bg_medium'],
            corner_radius=8,
            border_width=1,
            border_color=COLORS['border']
        )
        table_frame.pack(fill='both', expand=True)
        
        table_header = ctk.CTkFrame(table_frame, fg_color='transparent')
        table_header.pack(fill='x', padx=16, pady=16)
        
        ctk.CTkLabel(
            table_header,
            text="Recent Findings & Reports",
            font=("Arial", 11, "bold"),
            text_color=COLORS['text_primary']
        ).pack(side='left')
        
        # Table columns header
        columns_frame = ctk.CTkFrame(
            table_frame,
            fg_color=COLORS['bg_dark'],
            height=40
        )
        columns_frame.pack(fill='x', padx=16)
        columns_frame.pack_propagate(False)
        
        columns = ["ID", "Type", "Severity", "Asset/Source", "Date", "Status"]
        for col in columns:
            ctk.CTkLabel(
                columns_frame,
                text=col,
                font=("Arial", 9, "bold"),
                text_color=COLORS['text_secondary']
            ).pack(side='left', expand=True, padx=4)
        
        # Sample findings
        findings_data = [
            ("101000.000000", "Prompt-Injection", "Critical", "AIPIblosses", "1/23/2021"),
            ("103000.000090", "Prompt-Injection", "High", "Computer Security", "1/23/2021"),
            ("113000.000093", "Application Report", "Medium", "Computer Security", "1/23/2021"),
            ("131000.000005", "Recent Findings", "Low", "Finezie.bireman", "3/23/2021"),
            ("133000.000005", "Prompt-Injection", "High", "Computer Security", "1/23/2021"),
        ]
        
        for finding in findings_data:
            self._add_finding_row(table_frame, finding)
        
        # Right sidebar - Overview
        right_panel = ctk.CTkFrame(
            main_container,
            width=280,
            fg_color=COLORS['bg_medium'],
            border_width=1,
            border_color=COLORS['border']
        )
        right_panel.pack(side='right', fill='y', padx=0, pady=0)
        right_panel.pack_propagate(False)
        
        # Overview header
        ctk.CTkLabel(
            right_panel,
            text="Overview",
            font=("Arial", 11, "bold"),
            text_color=COLORS['text_primary']
        ).pack(padx=16, pady=16, anchor='w')
        
        # Critical Findings card
        self._add_stat_card(right_panel, "Critical Findings", "25", COLORS['red'])
        
        # High Risk Assets card
        self._add_stat_card(right_panel, "High Risk Assets", "7", COLORS['yellow'])
        
        # Generated Reports card
        self._add_stat_card(right_panel, "Generated Reports", "48", COLORS['blue'])
        
        # Risk Distribution
        risk_frame = ctk.CTkFrame(right_panel, fg_color='transparent')
        risk_frame.pack(fill='x', padx=16, pady=16)
        
        ctk.CTkLabel(
            risk_frame,
            text="Risk Distribution",
            font=("Arial", 10, "bold"),
            text_color=COLORS['text_primary']
        ).pack(anchor='w', pady=(0, 8))
        
        # Risk bars
        self._add_risk_bar(risk_frame, "Critical", 25, COLORS['red'])
        self._add_risk_bar(risk_frame, "High Risk", 7, COLORS['yellow'])
        self._add_risk_bar(risk_frame, "Medium", 10, COLORS['blue'])
        self._add_risk_bar(risk_frame, "Low", 3, COLORS['green'])
    
    def _add_finding_row(self, parent, data):
        """Add a finding row to the table"""
        row = ctk.CTkFrame(
            parent,
            fg_color=COLORS['bg_dark'],
            height=36
        )
        row.pack(fill='x', padx=16, pady=1)
        row.pack_propagate(False)
        
        # ID
        ctk.CTkLabel(
            row,
            text=data[0],
            font=("Arial", 8),
            text_color=COLORS['text_primary']
        ).pack(side='left', expand=True, padx=4)
        
        # Type
        ctk.CTkLabel(
            row,
            text=data[1],
            font=("Arial", 8),
            text_color=COLORS['text_primary']
        ).pack(side='left', expand=True, padx=4)
        
        # Severity badge
        severity_colors = {
            'Critical': COLORS['red'],
            'High': COLORS['yellow'],
            'Medium': COLORS['blue'],
            'Low': COLORS['green']
        }
        
        severity_label = ctk.CTkLabel(
            row,
            text=data[2],
            font=("Arial", 8, "bold"),
            text_color='white',
            fg_color=severity_colors.get(data[2], COLORS['text_secondary']),
            corner_radius=4,
            width=60,
            height=20
        )
        severity_label.pack(side='left', expand=True, padx=4)
        
        # Asset
        ctk.CTkLabel(
            row,
            text=data[3],
            font=("Arial", 8),
            text_color=COLORS['text_primary']
        ).pack(side='left', expand=True, padx=4)
        
        # Date
        ctk.CTkLabel(
            row,
            text=data[4],
            font=("Arial", 8),
            text_color=COLORS['text_secondary']
        ).pack(side='left', expand=True, padx=4)
        
        # Status
        ctk.CTkLabel(
            row,
            text="Download",
            font=("Arial", 8),
            text_color=COLORS['text_primary']
        ).pack(side='left', expand=True, padx=4)
    
    def _add_stat_card(self, parent, label, value, color):
        """Add a statistics card"""
        card = ctk.CTkFrame(
            parent,
            fg_color=COLORS['bg_dark'],
            corner_radius=8,
            border_width=1,
            border_color=COLORS['border_light']
        )
        card.pack(fill='x', padx=16, pady=4)
        
        ctk.CTkLabel(
            card,
            text=label,
            font=("Arial", 9),
            text_color=COLORS['text_secondary']
        ).pack(padx=12, pady=(12, 4), anchor='w')
        
        ctk.CTkLabel(
            card,
            text=value,
            font=("Arial", 24, "bold"),
            text_color=color
        ).pack(padx=12, pady=(0, 12), anchor='w')
    
    def _add_risk_bar(self, parent, label, value, color):
        """Add a risk distribution bar"""
        bar_frame = ctk.CTkFrame(parent, fg_color='transparent')
        bar_frame.pack(fill='x', pady=4)
        
        # Label and value
        label_frame = ctk.CTkFrame(bar_frame, fg_color='transparent')
        label_frame.pack(fill='x')
        
        ctk.CTkLabel(
            label_frame,
            text=label,
            font=("Arial", 8),
            text_color=COLORS['text_secondary']
        ).pack(side='left')
        
        ctk.CTkLabel(
            label_frame,
            text=str(value),
            font=("Arial", 8),
            text_color=COLORS['text_primary']
        ).pack(side='right')
        
        # Progress bar
        progress = ctk.CTkProgressBar(
            bar_frame,
            width=240,
            height=8,
            corner_radius=4,
            fg_color=COLORS['bg_dark'],
            progress_color=color
        )
        progress.pack(fill='x', pady=2)
        progress.set(value / 25)  # Normalize to 0-1 range


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
