#
# Copyright (C) 2008-2014 The LuCI Team <luci@lists.subsignal.org>
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Tools for network diagnosis like traceroute and ping
LUCI_DEPENDS:=

include ../../freifunk.mk

# call BuildPackage - OpenWrt buildroot signature
