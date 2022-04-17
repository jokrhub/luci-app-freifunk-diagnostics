'use strict';
'require view';

// To be updated
// - Button click events
// - Modify XHR

var stxhr = new XHR();

function update_status(field, proto)
{
    var tool = field.name;
    var addr = field.value;
    var protocol = proto ? "6" : "";

    var legend = document.getElementById('diag-rc-legend');
    var output = document.getElementById('diag-rc-output');

    if (legend && output)
    {
        output.innerHTML =
            '<img src="<%=resource%>/icons/loading.gif" alt="<%:Loading%>" style="vertical-align:middle" /> ' +
            '<%:Waiting for command to complete...%>'
        ;

        legend.parentNode.style.display = 'block';
        legend.style.display = 'inline';

        stxhr.get("<%=url('freifunk/status')%>/diag_" + tool + protocol + '/' + addr, null,
            function(x)
            {
                if (x.responseText)
                {
                    legend.style.display = 'none';
                    output.innerHTML = String.format('<pre>%h</pre>', x.responseText);
                }
                else
                {
                    legend.style.display = 'none';
                    output.innerHTML = '<span class="error"><%:Bad address specified!%></span>';
                }
            }
        );
    }
}


return view.extend({
    handleSaveApply: null,
    handleSave: null,
    handleReset: null,

    render: function (data) {

        let ping_proto;
        let traceroute_proto;

        if (has_ping6) {
            ping_proto = E('div', {}, [
                E('select', { name:"ping_proto", style:"width:auto" }, [
                    E('option', { value: '', selected: 'selected'}, _('IPv4') ),
                    E('option', { value: '6' }, _('IPv6') ),
                ]),

                E('button', {
                    'class': 'cbi-button',
                    'value': 'Ping',
                    'click': '',
                    },
                    [
                ])
            ])
        }
        else {
            ping_proto = E('div', {}, [
                E('button', {
                    'class': 'cbi-button',
                    'value': 'Ping',
                    'click': '',
                    },
                    [
                ])
            ])
        }


        if (has_traceroute6) {
            traceroute_proto = E('div', {}, [
                E('select', { name:"traceroute_proto", style:"width:auto" }, [
                    E('option', { value: '', selected: 'selected'}, _('IPv4') ),
                    E('option', { value: '6' }, _('IPv6') ),
                ]),

                E('button', {
                    'class': 'cbi-button',
                    'value': 'Traceroute',
                    'click': '',
                    },
                    [
                ])
            ])
        }
        else {
            traceroute_proto = E('div', {}, [
                E('button', {
                    'class': 'cbi-button',
                    'value': 'Traceroute',
                    'click': '',
                    },
                    [
                ]),
                E('p'),
                E('p', _('Install iputils-traceroute6 for IPv6 traceroute'))
            ])
        }

        let body = E('div', { 'class': 'cbi-map' }, [
            E('legend', _('Diagnostics')),

            E('div', { 'class': 'cbi-section' }, [
                E('h2', _('Network Utilities')),
                E('br'),


                E('div', {'style': 'width:30%; float:left'}, [
                    E('input', { style: 'margin: 5px 0', type: 'text', 'value': 'dev.openwrt.org', name: 'ping'}),
                    E('br'),
                    ping_proto,
                ]),

                E('div', {'style': 'width:33%; float:left'}, [
                    E('input', { style: 'margin: 5px 0', type: 'text', 'value': 'dev.openwrt.org', name: 'traceroute'}),
                    E('br'),
                    traceroute_proto,
                ]),

                E('div', {'style': 'width:33%; float:left'}, [
                    E('input', { style: 'margin: 5px 0', type: 'text', value: 'openwrt.org', name: 'nslookup'}),
                    E('button', {
                        'class': 'cbi-button',
                        'value': _('Nslookup'),
                        'click': '',
                        },
                        [
                    ]),

                    E('br', { style: 'clear:both'})

                ])
            ]),

            E('div', { 'class': 'cbi-section', style: 'display: none' }, [
                E('legend', { id: 'diag-rc-legend'}, _('Collecting data...')),
                E('span', { id: 'diag-rc-output'}),
            ])

        ])
    }
});